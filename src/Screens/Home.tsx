import { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import Header from "Components/Header";
import Footer from "Components/Footer";
import ListItem from "Components/ListItem";
import { useItems } from "Contexts/ItemsContext";
import { Title } from "react-native-paper";
import { GapContainer } from "Components/GapContainer";

export default function Home() {
  const { items: medications } = useItems();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredMedications = medications.filter(medication => (
    medication.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    medication.affliction.toLowerCase().includes(searchQuery.toLowerCase())
  ));

  return (
    < >
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
      <ScrollView contentContainerStyle={styles.list}>
        <GapContainer gap={20}>
          <Title style={{textAlign: "center"}}>Medications</Title>
          {filteredMedications.map(medication => (
            <ListItem key={medication.id} medication={medication}/>
          ))}
        </GapContainer>
      </ScrollView>
      <Footer/>
    </>
  );
}

const styles = StyleSheet.create({
  list: {
    padding: 24
  }
});