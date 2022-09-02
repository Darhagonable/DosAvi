export const fakeData: Medication[] = [
  {
    id: "1",
    name: "Cytostatika",
    affliction: "Cancer",
    daysPreset: "custom",
    daysCustom: ["Monday", "Friday"],
    times: [{id: "1", hours: 13, minutes: 37}, {id: "1", hours: 2, minutes: 32}],
    misc: "YO YO"
  },
  {
    id: "2",
    name: "Cytostatika2",
    affliction: "Cancer2",
    daysPreset: "every-other-day",
    times: [{id: "1", hours: 13, minutes: 37}, {id: "1", hours: 2, minutes: 32}]
  }
];