import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import Header from "Components/Header";
import Footer from "Components/Footer";
import ListItem from "Components/ListItem";
import { useItems } from "Contexts/ItemsContext";
import { Title } from "react-native-paper";
import { GapContainer } from "Components/GapContainer";

export default function Home() {
  const { items: medications } = useItems();

  return (
    < >
      <Header/>
      <ScrollView contentContainerStyle={styles.list}>
        <GapContainer gap={20}>
          <Title style={{textAlign: "center"}}>Medications</Title>
          {medications.map(medication => (
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