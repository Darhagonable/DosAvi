import { useState } from "react";
import { Keyboard } from "react-native";
import { TextInput } from "react-native-paper";
import { TimePickerModal } from "react-native-paper-dates";
import displayTime from "Utils/displayTimes";

interface Props {
  time: Timestamp
  onChange: (newTimestamp: Timestamp) => void
  onRemove: (timestamp: Timestamp) => void
}

export default function TimeInput({time, onChange, onRemove}: Props) {
  const [showTimePicker, setShowTimePicker] = useState(false);

  function editTime() {
    setShowTimePicker(true);
    Keyboard.dismiss();
  }

  function removeTime() {
    onRemove(time);
    Keyboard.dismiss();
  }

  return (
    < >
      <TimePickerModal
        visible={showTimePicker}
        onDismiss={() => setShowTimePicker(false)}
        onConfirm={(newTime) => {
          onChange({...newTime, id: time.id});
          setShowTimePicker(false);
        }}
        hours={time.hours}
        minutes={time.minutes}
      />
      <TextInput
        value={displayTime(time)}
        mode="outlined"
        dense
        left={<TextInput.Icon name="clock-edit-outline" onPress={editTime}/>}
        right={<TextInput.Icon name="close" onPress={removeTime}/>}
        editable={false}
      />
    </>
  );
}