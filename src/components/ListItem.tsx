import { Text, View, StyleSheet } from "react-native";
import { Shadow } from "react-native-shadow-2";

interface Props {
  medication: Medication
}

export default function ListItem({ medication }: Props) {
  return (
    <Shadow distance={5} style={styles.card} stretch>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text>{medication.name}</Text>
        </View>
      </View>
    </Shadow>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 8,
    color: "#212121",
    fontWeight: 500,
    marginBottom: 24
  },
  content: {
    display: "flex",
    flexDirection: "column"
  },
  header: {
    display: "flex",
    flexDirection: "row",
    padding: 10
  }
});
