import { useMemo, useRef, useState } from "react";
import { ScrollView, StyleSheet, Text, View, TextInput as TextInputType } from "react-native";
import { useRoute, useNavigation, RouteProp } from "@react-navigation/native";
import Header from "Components/Header";
import { Avatar, Button, Card, Dialog, TextInput, Title, ToggleButton, TouchableRipple, useTheme } from "react-native-paper";
import DropDown from "react-native-paper-dropdown";
import TimeInput from "Components/TimeInput";
import NewTimeInput from "Components/NewTimeInput";
import { GapContainer } from "Components/GapContainer";
import { RootStackParamList } from "navigation";
import { useItems } from "Contexts/ItemsContext";

type Draft = Omit<Medication, "id" | "notificationIds">;

const days: Array<Day> = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

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

  const ailmentInputRef = useRef<TextInputType>(null);

  const [showDropDown, setShowDropDown] = useState(false);

  const list: Array<{label: string, value: DaysPreset}> = [
    {label: "Every day", value: "every-day"},
    {label: "Every other day", value: "every-other-day"},
    {label: "Workdays", value: "workdays"},
    {label: "Weekends", value: "weekends"},
    {label: "Choose days", value: "custom"}
  ];

  const validations = useMemo<Partial<Record<keyof Draft, boolean>>>(() => ({
    name: !!draft.name,
    affliction: !!draft.affliction,
    times: !!draft.times.length
  }), [draft]);

  const [showRemoveDialog, setShowRemoveDialog] = useState(false);

  return (
    < >
      <Header hasBackButton title="Details"/>
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
                onSubmitEditing={() => ailmentInputRef.current?.focus()}
                blurOnSubmit={false}
              />

              <TextInput
                label="Ailment"
                ref={ailmentInputRef}
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
                setValue={(newOption: DaysPreset) => setDraft((draft) => ({...draft, daysPreset: newOption}))}
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
            <Button
              onPress={() => {
                isNew ? createItem(draft) : updateItem({...draft, id: medication.id, notificationIds: medication.notificationIds});
                navigation.goBack();
              }}
              disabled={Object.values(validations).some(v => !v)}
            >
              {isNew ? "Create" : "Update"}
            </Button>
          </Card.Actions>
        </Card>

        {!isNew && (
          <Card style={{marginTop: 24, overflow: "hidden"}}>
            <TouchableRipple onPress={() => setShowRemoveDialog(true)}>
              <Card.Title
                title="Remove medication"
                titleStyle={{fontSize: 16}}
                left={(props) => <Avatar.Icon {...props} icon="trash-can-outline" color={colors.surface} style={{backgroundColor: colors.secondary}}/>}
              />
            </TouchableRipple>
          </Card>
        )}
      </ScrollView>

      {!isNew && (
        <Dialog visible={showRemoveDialog} onDismiss={() => setShowRemoveDialog(false)}>
          <Dialog.Title>Are you sure you wanna remove this medication?</Dialog.Title>
          <Dialog.Actions>
            <Button onPress={() => setShowRemoveDialog(false)}>Cancel</Button>
            <Button color={colors.secondary} onPress={() => {
              deleteItem(medication.id);
              navigation.goBack();
            }}>
              Remove
            </Button>
          </Dialog.Actions>
        </Dialog>
      )}
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