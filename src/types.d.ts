type Days = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";
type DaysPreset = "every-day" | "every-other-day" | "weekdays" | "weekends" | "custom";

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
  daysCustom?: Array<Days>
  times: Array<Timestamp>
  misc?: string
}