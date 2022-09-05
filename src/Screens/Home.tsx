import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import Header from "Components/Header";
import Footer from "Components/Footer";
import ListItem from "Components/ListItem";
import { useItems } from "Contexts/ItemsContext";

export default function Home() {
  const { items: medications } = useItems();

  return (
    < >
      <Header/>
      <ScrollView contentContainerStyle={styles.list}>
        {medications.map(medication => (
          <ListItem key={medication.id} medication={medication}/>
        ))}
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