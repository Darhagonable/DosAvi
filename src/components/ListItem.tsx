import * as React from "react";
import { StyleSheet } from "react-native";
import { Card, Title, Paragraph, ProgressBar } from "react-native-paper";

interface Props {
  medication: Medication
}

export default function ListItem({medication}: Props) {
  return (
    <Card style={styles.card} elevation={3}>
      <Card.Content>
        <Title>{medication.name}</Title>
        <Paragraph>{medication.affliction} • {medication.days}</Paragraph>
      </Card.Content>
      <ProgressBar progress={0.5} style={styles.progressbar}/>
    </Card>
  );
}


const styles = StyleSheet.create({
  card: {
    marginBottom: 24,
    overflow: "hidden"
  },
  progressbar: {
    height: 10
  }
});
