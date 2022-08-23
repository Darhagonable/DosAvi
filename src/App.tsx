import { StyleSheet, SafeAreaView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useTheme } from "react-native-paper";
import Router from "Router";

export default function App() {
  const theme = useTheme();

  return (
    <SafeAreaView style={{...styles.container, backgroundColor: theme.colors.background}}>
      <StatusBar style="auto"/>
      <Router/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
