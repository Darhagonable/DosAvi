import { useState, useEffect, createContext, useContext, useMemo, ReactNode } from "react";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import generateId from "../Utils/generateId";
import { scheduleNotifications, cancelNotifications, cancelAllScheduledNotifications } from "Utils/notifications";

interface IItemsContext {
  items: Medication[]
  createItem: (item: Omit<Medication, "id" | "notificationIds">) => void
  updateItem: (item: Medication) => void
  deleteItem: (itemId: string) => void
  deleteAllItems: () => void
}

const ItemsContext = createContext<IItemsContext>({} as IItemsContext);

export function useItems() {
  const value = useContext(ItemsContext);

  if(!value)
    throw new Error("Tried to access ItemsContext outside of provider!");

  return value;
}


export function ItemsProvider({children}: {children: ReactNode}) {
  const [itemsState, setItemsState] = useState<Array<Medication>>([]);
  const { getItem: getItems, setItem: setItems } = useAsyncStorage("items");

  const readFromStorage = async () => {
    const response = await getItems();
    const items: Array<Medication> = response ? JSON.parse(response) : [];
    setItemsState(items);
  };

  const writeToStorage = async (updatedItems: Array<Medication>) => {
    const jsonValue = JSON.stringify(updatedItems);
    await setItems(jsonValue);
    setItemsState(updatedItems);
  };

  useEffect(() => {
    readFromStorage();
  }, []);


  async function createItem(item: Omit<Medication, "id" | "notificationIds">) {
    const notificationIds = await scheduleNotifications(item);

    const updatedItems = [...itemsState, {...item, id: generateId(), notificationIds}];
    writeToStorage(updatedItems);
  }

  async function updateItem(item: Medication) {
    await cancelNotifications(item.notificationIds);
    const notificationIds = await scheduleNotifications(item);

    const currentIndex = itemsState.findIndex((stateItem) => stateItem.id === item.id);
    const updatedItems: Array<Medication> = [...itemsState];
    updatedItems[currentIndex] = {...item, notificationIds};
    writeToStorage(updatedItems);
  }

  async function deleteItem(itemId: string) {
    const item = itemsState.find((stateItem) => stateItem.id === itemId);
    if(!item) throw new Error("Failed to find item to cancel notifications for");
    await cancelNotifications(item.notificationIds);

    const updatedItems: Array<Medication> = itemsState.filter((stateItem) => stateItem.id !== itemId);
    writeToStorage(updatedItems);
  }

  async function deleteAllItems() {
    await cancelAllScheduledNotifications();
    writeToStorage([]);
  }

  const values = useMemo(() => ({
    items: itemsState,
    createItem,
    updateItem,
    deleteItem,
    deleteAllItems
  }), [itemsState]);

  return (
    <ItemsContext.Provider value={values}>
      {children}
    </ItemsContext.Provider>
  );
}