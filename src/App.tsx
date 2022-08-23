import { StyleSheet, ScrollView, SafeAreaView } from "react-native";
import Footer from "components/Footer";
import ListItem from "components/ListItem";
import { fakeData } from "fakeData";
import Header from "components/Header";
import { StatusBar } from "expo-status-bar";
import { useTheme } from "react-native-paper";

export default function App() {
  const theme = useTheme();

  return (
    <SafeAreaView style={{...styles.container, backgroundColor: theme.colors.background}}>
      <StatusBar style="auto"/>
      <Header/>
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
