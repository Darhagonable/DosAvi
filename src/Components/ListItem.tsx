import { useNavigation } from "@react-navigation/native";
import { Fragment } from "react";
import { StyleSheet, View } from "react-native";
import { Card, Title, Paragraph, ProgressBar, TouchableRipple, IconButton } from "react-native-paper";
import displayTime from "Utils/displayTimes";

const friendlyDaysPresets = {
  "every-day": "Every day",
  "every-other-day": "Every other day",
  "workdays": "Workdays",
  "weekends": "Weekends",
  "custom": "Choose days"
};

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
            <Paragraph>Against {medication.affliction} • {medication.daysCustom?.map(day => day.slice(0, 3)).join(", ") ?? friendlyDaysPresets[medication.daysPreset]}</Paragraph>
            <Paragraph>
              {medication.times.map((timestamp, index) => (
                <Fragment key={timestamp.id}>
                  {displayTime(timestamp)}
                  {index + 1 !== medication.times.length && " • "}
                </Fragment>
              ))}
            </Paragraph>
            {medication.misc && <Paragraph>{medication.misc}</Paragraph>}
            <View style={{flexDirection: "row", alignItems: "center", marginLeft: 0, left: 0}}>
              <IconButton size={30} icon="timer-outline" style={{marginHorizontal: -5}}/>
              <Title>til next dosage</Title>
            </View>
          </Card.Content>
          <ProgressBar progress={0.5} style={styles.progressbar}/>
        </>
      </TouchableRipple>
    </Card>
  );
}


const styles = StyleSheet.create({
  card: {
    overflow: "hidden"
  },
  progressbar: {
    height: 11
  }
});
