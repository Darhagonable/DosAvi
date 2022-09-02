import { useState } from "react";
import { Keyboard } from "react-native";
import { TextInput } from "react-native-paper";
import { TimePickerModal } from "react-native-paper-dates";

interface Props {
  onCreate: (newTimestamp: Timestamp) => void
}

export default function NewTimeInput({onCreate}: Props) {
  const [showTimePicker, setShowTimePicker] = useState(false);

  function editTime() {
    setShowTimePicker(true);
    Keyboard.dismiss();
  }

  function generateNewId() {
    return (Math.random() + 1).toString(36).substring(2);
  }

  return (
    < >
      <TimePickerModal
        visible={showTimePicker}
        onDismiss={() => setShowTimePicker(false)}
        onConfirm={(newTime) => {
          onCreate({...newTime, id: generateNewId()});
          setShowTimePicker(false);
        }}
      />
      <TextInput
        mode="outlined"
        dense
        left={<TextInput.Icon name="clock-plus-outline" onPress={editTime}/>}
        editable={false}
        style={{width: 49}}
      />
    </>
  );
}