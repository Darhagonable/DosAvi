import * as React from "react";
import { Appbar, useTheme } from "react-native-paper";

export default function Header() {
  const theme = useTheme();

  return (
    <Appbar.Header dark={false} style={{backgroundColor: theme.colors.surface}}>
      <Appbar.Action icon="menu" onPress={() => null}/>
      <Appbar.Content title="DosAvi" style={{alignItems: "center"}}/>
      <Appbar.Action icon="magnify" onPress={() => null}/>
    </Appbar.Header>
  );
}