import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { StyleSheet } from "react-native";
import { Card, Title, Paragraph, ProgressBar, TouchableRipple } from "react-native-paper";

interface Props {
  medication: Medication
}

export default function ListItem({medication}: Props) {
  const navigation = useNavigation();

  return (
    <Card style={styles.card} elevation={3}>
      <TouchableRipple onPress={() => navigation.navigate("Details", {medication})}>
        < >
          <Card.Content>
            <Title>{medication.name}</Title>
            <Paragraph>{medication.affliction} • {medication.daysCustom ?? medication.daysPreset}</Paragraph>
          </Card.Content>
          <ProgressBar progress={0.5} style={styles.progressbar}/>
        </>
      </TouchableRipple>
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
