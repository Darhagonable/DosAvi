import { StyleSheet, SafeAreaView } from "react-native";
import { StatusBar } from "expo-status-bar";
import Router from "Router";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
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
