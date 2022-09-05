export default function displayTime(timestamp: Timestamp) {
  const date = new Date();
  date.setHours(timestamp.hours, timestamp.minutes);
  return date.toLocaleTimeString([], {hour: "numeric", minute: "numeric"});
}