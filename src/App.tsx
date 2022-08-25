import React from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import { StatusBar } from "expo-status-bar";
import Router from "Router";
import { createDrawerNavigator } from "@react-navigation/drawer";
import DrawerContent from "Components/DrawerContent";
import { useThemeContext } from "Contexts/themeContext";

export default function App() {
  const Drawer = createDrawerNavigator();
  const { mode } = useThemeContext();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style={mode === "dark" ? "light" : "dark"}/>
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