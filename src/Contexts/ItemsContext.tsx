import { useState, useEffect, createContext, useContext, useMemo, ReactNode } from "react";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import generateId from "../Utils/generateId";

interface IItemsContext {
  items: Medication[];
  createItem: (item: Omit<Medication, "id">) => void;
  updateItem: (item: Medication) => void;
  deleteItem: (itemId: string) => void;
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


  function createItem(item: Omit<Medication, "id">) {
    writeToStorage([...itemsState, {...item, id: generateId()}]);
  }

  function updateItem(item: Medication) {
    const currentIndex = itemsState.findIndex((stateItem) => stateItem.id === item.id);
    const updatedItems: Array<Medication> = [...itemsState];
    updatedItems[currentIndex] = item;
    writeToStorage(updatedItems);
  }

  function deleteItem(itemId: string) {
    const updatedItems: Array<Medication> = itemsState.filter((stateItem) => stateItem.id !== itemId);
    writeToStorage(updatedItems);
  }

  const values = useMemo(() => ({
    items: itemsState,
    createItem,
    updateItem,
    deleteItem
  }), [itemsState]);

  return (
    <ItemsContext.Provider value={values}>
      {children}
    </ItemsContext.Provider>
  );
}