import { useNavigation } from "@react-navigation/native";
import { StyleSheet, View} from "react-native";
import { FAB, IconButton, useTheme } from "react-native-paper";
import { Svg, Path } from "react-native-svg";

export default function Footer() {
  const navigation = useNavigation();
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <View style={{...styles.side, backgroundColor: theme.colors.surface}}/>
      <View style={styles.center}>
        <Svg width={67} height={27} viewBox="0 0 541.49 214.97" fill={theme.colors.surface}>
          <Path d="M541.49,0a23.41,23.41,0,0,0-21.2,13.4c-44,93.65-139.21,158.49-249.54,158.49S65.23,107.05,21.2,13.4A23.41,23.41,0,0,0,0,0V215H541.49Z"/>
        </Svg>
        <FAB icon={() => <IconButton icon="plus" color={theme.colors.primary} size={40} style={{left: -23.5, top: -23.5}}/>} style={styles.button} onPress={() => navigation.navigate("Details")}/>
      </View>
      <View style={{...styles.side, backgroundColor: theme.colors.surface}}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    borderWidth: 0, // Otherwise shadow disappears. Yes this is janky as hell
    elevation: 30
  },
  side: {
    flexGrow: 1,
    height: 27
  },
  center: {
    alignItems: "center"
  },
  button: {
    top: -41,
    backgroundColor: "white",
    position: "absolute"
  }
});