import { useState } from "react";
import { Text, View } from "react-native";
import { Appbar, Searchbar, useTheme } from "react-native-paper";
import { DrawerActions, useNavigation } from "@react-navigation/native";

interface Props {
  title?: string
  hasBackButton?: boolean
  searchQuery?: string
  setSearchQuery?: (newSearchQuery: string) => void
}

export default function Header({title, hasBackButton, searchQuery, setSearchQuery}: Props) {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const [showSearchbar, setShowSearchbar] = useState(false);

  const hasSearchbar = searchQuery !== undefined && setSearchQuery !== undefined;

  return (
    <Appbar.Header style={{backgroundColor: colors.surface}}>
      {hasBackButton
        ? <Appbar.BackAction onPress={navigation.goBack}/>
        : <Appbar.Action icon="menu" onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}/>
      }
      {hasSearchbar && showSearchbar
        ? (
          <View style={{flexGrow: 1, padding: 15}}>
            <Searchbar
              placeholder="Search"
              onChangeText={(newSearchQuery => setSearchQuery(newSearchQuery))}
              value={searchQuery}
              style={{height: 40}}
              autoFocus
              onBlur={() => !searchQuery && setShowSearchbar(false)}
            />
          </View>
        )
        : (
          <Appbar.Content title={title ?? < >
            <Text style={{color: colors.primary}}>Dos</Text>
            <Text style={{color: colors.secondary}}>Avi</Text>
          </>} style={{alignItems: "center"}}/>
        )
      }
      {hasSearchbar
        ? <Appbar.Action icon="magnify" onPress={() => !searchQuery && setShowSearchbar(!showSearchbar)}/>
        : <Appbar.Action icon=""/>
      }
    </Appbar.Header>
  );
}