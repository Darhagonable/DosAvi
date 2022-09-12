import { ReactNode, useState } from "react";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { useThemeContext,ThemeSetting } from "Contexts/themeContext";
import { ActivityIndicator, Button, Dialog, Divider, List, Portal, RadioButton, useTheme } from "react-native-paper";
import { cancelAllScheduledNotifications } from "Utils/notifications";
import { useItems } from "Contexts/ItemsContext";

export default function DrawerContent() {
  const { themeSetting, setThemeSetting } = useThemeContext();
  const {colors} = useTheme();

  const [ApperanceAccordion, setApperanceAccordion] = useState(true);
  type RepairStatus = "inactive" | "loading" | "success";
  const [repairStatus, setRepairStatus] = useState<RepairStatus>("inactive");
  const [showRemoveDialog, setShowRemoveDialog] = useState(false);

  const {items, updateItem, deleteAllItems} = useItems();

  async function repairNotifications() {
    setRepairStatus("loading");
    await cancelAllScheduledNotifications();
    items.forEach(updateItem);
    setTimeout(() => setRepairStatus("success"), 750);
    setTimeout(() => setRepairStatus("inactive"), 1500);
  }

  const repairStatusIcon: Record<RepairStatus, undefined | ((props: {color: string}) => ReactNode)> = {
    inactive: () => null,
    loading: (props) => <List.Icon {...props } icon={() => <ActivityIndicator {...props} animating={true} color="#f2d07e"/>} style={{margin: 0, height: 36}}/>,
    success: (props) => <List.Icon {...props } icon="check-circle-outline" color="#a0dea3" style={{margin: 0, height: 36}}/>
  };

  return (
    < >
      <DrawerContentScrollView>
        <List.Accordion
          title="Apperance"
          expanded={ApperanceAccordion}
          onPress={() => setApperanceAccordion(!ApperanceAccordion)}
          left={(props) => <List.Icon {...props } icon="theme-light-dark" style={{margin: 0}}/>}
        >
          <RadioButton.Group onValueChange={value => setThemeSetting(value as ThemeSetting)} value={themeSetting}>
            <RadioButton.Item label="Device Theme" value="system-theme" mode="ios"/>
            <RadioButton.Item label="Light" value="light" mode="ios"/>
            <RadioButton.Item label="Dark" value="dark" mode="ios"/>
          </RadioButton.Group>
          <Divider/>
        </List.Accordion>
        <List.Item title/>
        <List.Accordion
          title="Debug"
          theme={{colors: {primary: colors.secondary}}}
          left={(props) => <List.Icon {...props } icon="code-braces-box" style={{margin: 0}}/>}
        >
          <List.Item
            title="Repair notifications"
            onPress={repairNotifications}
            right={repairStatusIcon[repairStatus]}
          />
          <List.Item
            title="Remove all medications"
            onPress={() => setShowRemoveDialog(true)}
            style={{marginLeft: -55}}
          />
          <Divider/>
        </List.Accordion>
      </DrawerContentScrollView>

      <Portal>
        <Dialog visible={showRemoveDialog} onDismiss={() => setShowRemoveDialog(false)}>
          <Dialog.Title>Are you sure you wanna remove all medications?</Dialog.Title>
          <Dialog.Actions>
            <Button onPress={() => setShowRemoveDialog(false)}>
              Cancel
            </Button>
            <Button color={colors.secondary} onPress={deleteAllItems}>
              Remove
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  );
}