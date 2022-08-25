import { DrawerContentScrollView } from "@react-navigation/drawer";
import { useThemeContext,ThemeSetting } from "contexts/themeContext";
import { List, RadioButton } from "react-native-paper";

export default function DrawerContent() {
  const { themeSetting, setThemeSetting } = useThemeContext();

  return (
    <DrawerContentScrollView>
      <List.Accordion title="Apperance">
        <RadioButton.Group onValueChange={value => setThemeSetting(value as ThemeSetting)} value={themeSetting}>
          <RadioButton.Item label="Device Theme" value="system-theme" mode="ios"/>
          <RadioButton.Item label="Light" value="light" mode="ios"/>
          <RadioButton.Item label="Dark" value="dark" mode="ios"/>
        </RadioButton.Group>
      </List.Accordion>
    </DrawerContentScrollView>
  );
}