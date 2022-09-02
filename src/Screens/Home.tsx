import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import Header from "Components/Header";
import Footer from "Components/Footer";
import ListItem from "Components/ListItem";
import { fakeData } from "fakeData";

export default function Home() {
  return (
    < >
      <Header/>
      <ScrollView contentContainerStyle={styles.list}>
        {fakeData.map(medication => (
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