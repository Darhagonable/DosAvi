import { useEffect } from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import { StatusBar, setStatusBarStyle } from "expo-status-bar";
import { setBackgroundColorAsync, setButtonStyleAsync } from "expo-navigation-bar";
import Router from "Router";
import { createDrawerNavigator } from "@react-navigation/drawer";
import DrawerContent from "Components/DrawerContent";
import { useThemeContext, Mode } from "Contexts/themeContext";
import { useTheme } from "react-native-paper";

const inverseMode: Record<Mode, Mode> = {
  light: "dark",
  dark: "light"
};

export default function App() {
  const Drawer = createDrawerNavigator();
  const { mode } = useThemeContext();
  const { colors } = useTheme();

  useEffect(() => {
    setBackgroundColorAsync(colors.surface);
    setButtonStyleAsync(inverseMode[mode]);
    setStatusBarStyle(inverseMode[mode]);
  }, [mode]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar/>
      <Drawer.Navigator drawerContent={() => <DrawerContent/>} screenOptions={{headerShown: false}}>
        <Drawer.Screen name="Router" component={Router}/>
      </Drawer.Navigator>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});