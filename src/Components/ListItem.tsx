import { useNavigation } from "@react-navigation/native";
import { Fragment, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Card, Title, Paragraph, ProgressBar, TouchableRipple, IconButton, Text, useTheme } from "react-native-paper";
import displayTime from "Utils/displayTimes";
import { getPreviousAndUpcommingScheduledNotificationDates } from "Utils/notifications";

const friendlyDaysPresets = {
  "every-day": "Every day",
  "every-other-day": "Every other day",
  "workdays": "Workdays",
  "weekends": "Weekends",
  "custom": "Choose days"
};

const days: Array<Day> = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const timeStampSort = (a: Timestamp, b: Timestamp) => {
  if (a.hours < b.hours) return -1;
  if (a.hours > b.hours) return 1;

  if (a.minutes < b.minutes) return -1;
  if (a.minutes > b.minutes) return 1;

  return 0;
};

function countdownconvert(duration: number) {
  const days = Math.floor(duration / (1000 * 60 * 60 * 24));
  const hours = Math.floor((duration % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((duration % (1000 * 60)) / 1000);
  if(days)
    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  if(hours)
    return `${hours}h ${minutes}m ${seconds}s`;
  if(minutes)
    return `${minutes}m ${seconds}s`;
  return `${seconds}s`;
}

interface IPreviousAndUpcommingDate {
  upcommingDate?: number
  previousDate?: number
}

interface Props {
  medication: Medication
}

export default function ListItem({medication}: Props) {
  const navigation = useNavigation();
  const { fonts } = useTheme();

  const [{previousDate, upcommingDate}, setLastAndUpcommingDate] = useState<IPreviousAndUpcommingDate>({});

  useEffect(() => {
    const interval = setInterval(() => {
      getPreviousAndUpcommingScheduledNotificationDates(medication)
        .then(date => setLastAndUpcommingDate(date));
    }, 1000);
    return () => clearInterval(interval);
  }, [medication]);

  const durationTilNext = upcommingDate ? upcommingDate - new Date().getTime() : undefined;

  return (
    <Card style={styles.card} elevation={3}>
      <TouchableRipple onPress={() => navigation.navigate("Details", {medication})}>
        < >
          <Card.Content>
            <Title>{medication.name}</Title>
            <Paragraph>Against {medication.affliction} • {medication.daysCustom?.sort((a, b) => days.indexOf(a) - days.indexOf(b)).map(day => day.slice(0, 3)).join(", ") ?? friendlyDaysPresets[medication.daysPreset]}</Paragraph>
            <Paragraph>
              {medication.times.sort(timeStampSort).map((timestamp, index) => (
                <Fragment key={timestamp.id}>
                  {displayTime(timestamp)}
                  {index + 1 !== medication.times.length && " • "}
                </Fragment>
              ))}
            </Paragraph>
            {medication.misc && <Paragraph>{medication.misc}</Paragraph>}
            <View style={{flexDirection: "row", alignItems: "center", marginLeft: 0, left: 0}}>
              <IconButton size={30} icon="timer-outline" style={{marginHorizontal: -5}}/>
              <Text style={{...fonts.medium, fontSize: 15}}>{durationTilNext ? `${countdownconvert(durationTilNext)} til next dosage` : "loading..."}</Text>
            </View>
          </Card.Content>
          <ProgressBar progress={(previousDate && upcommingDate && durationTilNext) ? durationTilNext / (upcommingDate - previousDate) : undefined} style={styles.progressbar}/>
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
    height: 11,
    bottom: -1
  }
});
