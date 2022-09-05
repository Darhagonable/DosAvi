import { useState } from "react";
import { Keyboard } from "react-native";
import { TextInput } from "react-native-paper";
import { TimePickerModal } from "react-native-paper-dates";
import generateId from "Utils/generateId";

interface Props {
  onCreate: (newTimestamp: Timestamp) => void
}

export default function NewTimeInput({onCreate}: Props) {
  const [showTimePicker, setShowTimePicker] = useState(false);

  function editTime() {
    setShowTimePicker(true);
    Keyboard.dismiss();
  }

  return (
    < >
      <TimePickerModal
        visible={showTimePicker}
        onDismiss={() => setShowTimePicker(false)}
        onConfirm={(newTime) => {
          onCreate({...newTime, id: generateId()});
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