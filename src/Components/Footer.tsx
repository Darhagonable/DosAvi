import { useNavigation } from "@react-navigation/native";
import { StyleSheet, View} from "react-native";
import { FAB, IconButton, useTheme } from "react-native-paper";
import { Svg, Path } from "react-native-svg";

interface Props {
  hasAddButton?: boolean
}

export default function Footer({hasAddButton}: Props) {
  const navigation = useNavigation();
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <View style={{...styles.side, backgroundColor: colors.surface}}/>
      {hasAddButton && <View style={styles.center}>
        <Svg width={67} height={27} viewBox="0 0 541.49 212" fill={colors.surface}>
          <Path d="M541.49,0a23.41,23.41,0,0,0-21.2,13.4c-44,93.65-139.21,158.49-249.54,158.49S65.23,107.05,21.2,13.4A23.41,23.41,0,0,0,0,0V215H541.49Z"/>
        </Svg>
        <FAB
          style={{...styles.button, backgroundColor: colors.surface}}
          onPress={() => navigation.navigate("Details")}
          icon={() => <IconButton
            icon="plus"
            color={colors.primary}
            size={40}
            style={{margin: -18}}
          />}
        />
      </View>}
      <View style={{...styles.side, backgroundColor: colors.surface}}/>
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
    position: "absolute"
  }
});