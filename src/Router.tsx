import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "Screens/Home";
import Details from "Screens/Details";
import { useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native";

const Stack = createNativeStackNavigator();

export default function Router() {
  const { colors } = useTheme();

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.surface}}>
      <Stack.Navigator initialRouteName="Home" screenOptions={{animation: "slide_from_right", headerShown: false}}>
        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="Details" component={Details}/>
      </Stack.Navigator>
    </SafeAreaView>
  );
}