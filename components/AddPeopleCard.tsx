import useNameStore from "@/store/usenNamesStore";
import { lightTheme } from "@/theme";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const AddPeopleCard = function () {
  const addItem = useNameStore((state) => state.addItem);
  const [text, setText] = useState("");
  const [focused, setFocused] = useState(false);

  const clickHandler = function () {
    text.length && addItem(text);
    setText("");
  };

  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Ionicons name="people-outline" size={30} color="#e57db1" />
        <Text style={styles.text}>Add People</Text>
      </View>
      <View style={styles.inputRow}>
        <TextInput
          placeholder="Enter a Name..."
          autoFocus
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          blurOnSubmit={false}
          style={{
            width: "80%",
            borderWidth: focused ? 2 : 1,
            borderColor: focused ? "#e57db1" : lightTheme.border,
            padding: 10,
            borderRadius: 15,
            outlineWidth: 0,
          }}
          value={text}
          onChangeText={(value) => setText(value)}
          onSubmitEditing={clickHandler}
          returnKeyType="done"
        />
        <TouchableOpacity onPress={clickHandler}>
          <Ionicons
            name="add"
            size={30}
            color="#ffffff"
            style={{
              backgroundColor: "#e57db1",
              padding: 6,
              borderRadius: 15,
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddPeopleCard;

const styles = StyleSheet.create({
  card: {
    width: "90%",
    borderWidth: 1,
    borderColor: lightTheme.border,
    padding: 20,
    backgroundColor: lightTheme.headerBackground,
    alignSelf: "center",
    marginTop: 30,
    marginBottom: 30,
    gap: 40,
    borderRadius: 25,
  },
  row: {
    gap: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  inputRow: {
    gap: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  text: { fontSize: 20 },
  image: {
    width: 45,
    height: 45,
  },
});
