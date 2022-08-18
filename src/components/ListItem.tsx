import { Text, View, StyleSheet } from "react-native";

interface Props {
  medication: Medication
}

export default function ListItem({ medication }: Props) {
  return (
    <View style={styles.card}>
      <Text>{medication.name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    elevation: 5
  }
});
