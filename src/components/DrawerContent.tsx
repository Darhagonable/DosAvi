import { DrawerContentScrollView } from "@react-navigation/drawer";
import { useThemeContext } from "contexts/themeContext";
import { ColorSchemeName } from "react-native";
import { List, RadioButton } from "react-native-paper";

export default function DrawerContent() {
  const { mode, setMode } = useThemeContext();

  return (
    <DrawerContentScrollView>
      <List.Accordion title="Apperance">
        <RadioButton.Group onValueChange={value => setMode(value as ColorSchemeName)} value={mode as string}>
          <RadioButton.Item label="Light" value="light" mode="ios"/>
          <RadioButton.Item label="Dark" value="dark" mode="ios"/>
          <RadioButton.Item label="Device Theme" value="system-theme" mode="ios"/>
        </RadioButton.Group>
      </List.Accordion>
    </DrawerContentScrollView>
  );
}