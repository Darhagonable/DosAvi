import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "screens/Home";
import Details from "screens/Details";

const Stack = createNativeStackNavigator();

export default function Router() {
  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={{animation: "slide_from_right", headerShown: false}}>
      <Stack.Screen name="Home" component={Home}/>
      <Stack.Screen name="Details" component={Details}/>
    </Stack.Navigator>
  );
}