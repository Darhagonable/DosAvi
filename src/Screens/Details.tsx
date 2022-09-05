import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useRoute, useNavigation, RouteProp } from "@react-navigation/native";
import Header from "Components/Header";
import { Avatar, Button, Card, TextInput, Title, ToggleButton, TouchableRipple, useTheme } from "react-native-paper";
import DropDown from "react-native-paper-dropdown";
import TimeInput from "Components/TimeInput";
import NewTimeInput from "Components/NewTimeInput";
import { GapContainer } from "Components/GapContainer";
import { RootStackParamList } from "navigation";
import { useItems } from "Contexts/ItemsContext";

type Draft = Omit<Medication, "id">;

const days: Array<Days> = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export default function Details() {
  const { params: { medication } = {} } = useRoute<RouteProp<RootStackParamList, "Details">>();
  const navigation = useNavigation();
  const { colors, fonts } = useTheme();
  const { createItem, updateItem, deleteItem } = useItems();

  const isNew = !medication;

  const [draft, setDraft] = useState<Draft>(medication ?? {
    name: "",
    affliction: "",
    daysPreset: "every-day",
    daysCustom: undefined,
    times: []
  });

  const [showDropDown, setShowDropDown] = useState(false);

  const list: Array<{label: string, value: DaysPreset}> = [
    {label: "Every day", value: "every-day"},
    {label: "Every other day", value: "every-other-day"},
    {label: "Weekdays", value: "weekdays"},
    {label: "Weekends", value: "weekends"},
    {label: "Choose days", value: "custom"}
  ];

  return (
    < >
      <Header back/>
      <ScrollView contentContainerStyle={styles.container}>
        <Card>
          <Card.Content>
            <GapContainer gap={10}>

              <Title>{isNew ? "Add a new medication" : "Edit medication details"}</Title>

              <TextInput
                label="Name"
                placeholder="e.g. penicillin"
                mode="outlined"
                value={draft.name}
                onChangeText={newName => setDraft({...draft, name: newName})}
              />

              <TextInput
                label="Ailment"
                placeholder="e.g. lung inflammation"
                mode="outlined"
                value={draft.affliction}
                onChangeText={newAffliction => setDraft({...draft, affliction: newAffliction})}
              />

              <DropDown
                label="Days"
                mode="outlined"
                list={list}
                value={draft.daysPreset}
                showDropDown={() => setShowDropDown(true)}
                onDismiss={() => setShowDropDown(false)}
                visible={showDropDown}
                setValue={(newOption: DaysPreset) => setDraft({...draft, daysPreset: newOption})}
              />

              {draft.daysPreset === "custom" && (
                <View style={styles.toggleButtonRow}>
                  {days.map((day) => {
                    const isSelected = draft.daysCustom?.includes(day);
                    return (
                      <View key={day} style={{borderRadius: 50, overflow: "hidden"}}>
                        <ToggleButton
                          icon={({color}) => <Text style={{color, ...(isSelected ? fonts.medium : {})}}>{day[0]}</Text>}
                          value={day}
                          color={isSelected ? colors.primary : undefined}
                          style={{borderWidth: isSelected ? 1 : 0, borderRadius: 50, backgroundColor: "none", ...(isSelected && {borderColor: colors.primary})}}
                          status={isSelected ? "checked" : "unchecked"}
                          onPress={() => {
                            const currentIndex = draft.daysCustom?.indexOf(day) ?? -1;
                            const updatedDraft: Draft = {...draft, daysCustom: [...(draft.daysCustom ?? [])]};
                            if(currentIndex === -1)
                              updatedDraft.daysCustom?.push(day);
                            else
                              updatedDraft.daysCustom?.splice(currentIndex, 1);
                            setDraft(updatedDraft);
                          }}
                        />
                      </View>
                    );
                  })}
                </View>
              )}

              <GapContainer gap={5} gapCol={0} flexDirection="row" flexWrap="wrap" style={{flexDirection: "row", flexWrap: "wrap"}}>
                {draft.times.map((time) => (
                  <TimeInput
                    key={time.id}
                    time={time}
                    onChange={(newTimestamp) => {
                      const currentIndex = draft.times.indexOf(time) ?? -1;
                      const updatedDraft: Draft = {...draft, times: [...draft.times]};
                      updatedDraft.times[currentIndex] = newTimestamp;
                      setDraft(updatedDraft);
                    }}
                    onRemove={(timestamp) => {
                      const updatedDraft: Draft = {...draft, times: draft.times.filter(time => time.id !== timestamp.id)};
                      setDraft(updatedDraft);
                    }}
                  />
                ))}
                <NewTimeInput
                  onCreate={(newTimestamp) => {
                    const updatedDraft: Draft = {...draft, times: [...draft.times, newTimestamp]};
                    setDraft(updatedDraft);
                  }}
                />
              </GapContainer>

              <TextInput
                label="Other notes"
                placeholder="e.g. don't consume with meal"
                mode="outlined"
                value={draft.misc}
                onChangeText={newNotes => setDraft({...draft, misc: newNotes})}
              />

            </GapContainer>
          </Card.Content>
          <Card.Actions style={{justifyContent: "flex-end"}}>
            <Button onPress={navigation.goBack}>Cancel</Button>
            <Button onPress={() => {
              isNew ? createItem(draft) : updateItem({...draft, id: medication.id});
              navigation.goBack();
            }}>
              {isNew ? "Create" : "Update"}
            </Button>
          </Card.Actions>
        </Card>

        {!isNew && (
          <Card style={{marginTop: 24, overflow: "hidden"}}>
            <TouchableRipple onPress={() => {
              deleteItem(medication.id);
              navigation.goBack();
            }}>
              <Card.Title
                title="Remove medication"
                titleStyle={{fontSize: 16}}
                left={(props) => <Avatar.Icon {...props} icon="trash-can-outline" color={colors.surface} style={{backgroundColor: colors.secondary}}/>}
              />
            </TouchableRipple>
          </Card>
        )}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    paddingHorizontal: 12
  },
  toggleButtonRow: {
    flexDirection: "row",
    justifyContent: "space-between"
  }
});