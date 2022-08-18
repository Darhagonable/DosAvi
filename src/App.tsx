import { StyleSheet, Text, View, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import Footer from "components/Footer";
import ListItem from "components/ListItem";
import { fakeData } from "fakeData";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto"/>
      <ScrollView>
        <Text>Open up App.tsx to start working on your app!</Text>
        {fakeData.map(medication => (
          <ListItem key={medication.id} medication={medication}/>
        ))}
      </ScrollView>
      <Footer/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
