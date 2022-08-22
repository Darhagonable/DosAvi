import { StyleSheet, ScrollView, SafeAreaView, StatusBar } from "react-native";
import Footer from "components/Footer";
import ListItem from "components/ListItem";
import { fakeData } from "fakeData";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar/>
      <ScrollView contentContainerStyle={styles.list}>
        {fakeData.map(medication => (
          <ListItem key={medication.id} medication={medication}/>
        ))}
      </ScrollView>
      <Footer/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  list: {
    padding: 24
  }
});
