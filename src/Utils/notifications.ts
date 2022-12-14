import * as Notifications from "expo-notifications";

const weekdaysSunToSat = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const presetToDays: Record<Exclude<DaysPreset, "custom">, Array<Day>> = {
  "every-day": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
  "every-other-day": ["Monday", "Wednesday", "Friday", "Sunday"],
  "workdays": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  "weekends": ["Saturday", "Sunday"]
};

export async function scheduleNotifications(item: Omit<Medication, "id" | "notificationIds">) {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return await Promise.all((item.daysPreset === "custom" ? item.daysCustom! : presetToDays[item.daysPreset])
    .flatMap((day) => item.times.map((time) => {
      return Notifications.scheduleNotificationAsync({
        content: {
          title: "Time for next dose!",
          body: `Time to take a new dose of ${item.name} against ${item.affliction}`
        },
        trigger: {
          weekday: weekdaysSunToSat.indexOf(day) + 1,
          hour: time.hours,
          minute: time.minutes,
          repeats: true
        }
      });
    }))
  );
}

export async function cancelNotifications(notificationIds: Array<string>) {
  return await Promise.all(notificationIds.map((notificationId) => {
    return Notifications.cancelScheduledNotificationAsync(notificationId);
  }));
}

export async function getPreviousAndUpcommingScheduledNotificationDates(item: Medication) {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const allDates = await Promise.all((item.daysPreset === "custom" ? item.daysCustom! : presetToDays[item.daysPreset])
    .flatMap((day) => item.times.map((time) => {
      return Notifications.getNextTriggerDateAsync({
        weekday: weekdaysSunToSat.indexOf(day) + 1,
        hour: time.hours,
        minute: time.minutes,
        repeats: true
      });
    }))
  );
  const upcommingDate = Math.min(...allDates.filter(Boolean) as Array<number>);
  const previousDate = Math.max(...allDates.filter(Boolean) as Array<number>) - 604800000;

  return {
    upcommingDate: upcommingDate !== Infinity ? upcommingDate : undefined,
    previousDate: previousDate !== -Infinity ? previousDate : undefined
  };
}

export const cancelAllScheduledNotifications = Notifications.cancelAllScheduledNotificationsAsync;