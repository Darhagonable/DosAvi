import { Text } from "react-native";
import { Appbar, useTheme } from "react-native-paper";
import { DrawerActions, useNavigation } from "@react-navigation/native";

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
      <Appbar.Content title={< >
        <Text style={{color: colors.primary}}>Dos</Text>
        <Text style={{color: colors.secondary}}>Avi</Text>
      </>} style={{alignItems: "center"}}/>
      <Appbar.Action icon="magnify" onPress={() => null}/>
    </Appbar.Header>
  );
}