import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Svg, Path } from "react-native-svg";

const bgColor = "white";

export default function Footer() {
  return (
    <View style={styles.container}>
      <View style={styles.side}/>
      <View style={styles.center}>
        <Svg width={67} height={27} viewBox="0 0 541.49 214.97" fill={bgColor}>
          <Path d="M541.49,0a23.41,23.41,0,0,0-21.2,13.4c-44,93.65-139.21,158.49-249.54,158.49S65.23,107.05,21.2,13.4A23.41,23.41,0,0,0,0,0V215H541.49Z"/>
        </Svg>
        <TouchableOpacity style={styles.button}/>
      </View>
      <View style={styles.side}/>
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
    backgroundColor: bgColor,
    height: 27
  },
  center: {
    alignItems: "center"
  },
  button: {
    top: -41,
    justifyContent: "center",
    alignItems: "center",
    width: 58,
    height: 58,
    borderRadius: 50,
    backgroundColor: "white",
    position: "absolute",
    elevation: 2
  }
});