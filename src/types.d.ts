type Day = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";
type DaysPreset = "every-day" | "every-other-day" | "workdays" | "weekends" | "custom";

interface Timestamp {
  id: string
  hours: number
  minutes: number
}

interface Medication {
  id: string
  name: string
  affliction: string,
  daysPreset: DaysPreset
  daysCustom?: Array<Day>
  times: Array<Timestamp>
  misc?: string
  notificationIds: Array<string>
}