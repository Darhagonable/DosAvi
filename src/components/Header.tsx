import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { Appbar, useTheme } from "react-native-paper";

export default function Header({back}: {back?: boolean}) {
  const theme = useTheme();
  const navigation = useNavigation();

  if(back) return (
    <Appbar.Header dark={false} style={{backgroundColor: theme.colors.surface}}>
      <Appbar.BackAction onPress={navigation.goBack}/>
      <Appbar.Content title="Details" style={{alignItems: "center", position: "absolute", width: "100%", zIndex: -1}}/>
    </Appbar.Header>
  );

  return (
    <Appbar.Header dark={false} style={{backgroundColor: theme.colors.surface}}>
      <Appbar.Action icon="menu" onPress={() => null}/>
      <Appbar.Content title="DosAvi" style={{alignItems: "center"}}/>
      <Appbar.Action icon="magnify" onPress={() => null}/>
    </Appbar.Header>
  );
}