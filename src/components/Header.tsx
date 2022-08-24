import { DrawerActions, useNavigation } from "@react-navigation/native";
import * as React from "react";
import { Appbar, useTheme } from "react-native-paper";

export default function Header({back}: {back?: boolean}) {
  const { colors } = useTheme();
  const navigation = useNavigation();

  if(back) return (
    <Appbar.Header style={{backgroundColor: colors.surface}}>
      <Appbar.BackAction onPress={navigation.goBack}/>
      <Appbar.Content title="Details" style={{alignItems: "center", position: "absolute", width: "100%", zIndex: -1}}/>
    </Appbar.Header>
  );

  return (
    <Appbar.Header style={{backgroundColor: colors.surface}}>
      <Appbar.Action icon="menu" onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}/>
      <Appbar.Content title="DosAvi" style={{alignItems: "center"}}/>
      <Appbar.Action icon="magnify" onPress={() => null}/>
    </Appbar.Header>
  );
}