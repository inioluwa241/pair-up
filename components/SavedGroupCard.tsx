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

const SaveGroupCard = function ({
  items,
  itemLength,
}: {
  items: string[];
  itemLength: number;
}) {
  const setIsAnyGroupSaved = useNameStore((state) => state.setIsAnyGroupSaved);
  const updateSavedGroups = useNameStore((state) => state.updateSavedGroups);
  const [groupName, setGroupName] = useState("");
  const [isSaveGroupClicked, setIsSaveGroupClicked] = useState(false);
  const [focused, setFocused] = useState(false);

  const clickSaveGroup = function () {
    setIsSaveGroupClicked(true);
  };
  const clickSave = function () {
    setIsSaveGroupClicked(false);
    setIsAnyGroupSaved(true);

    const formatDate = (timestamp: number) => {
      return new Date(timestamp).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    };

    const group = {
      date: formatDate(Date.now()),
      groupName: groupName,
      numberOfName: itemLength,
      items: items,
    };

    updateSavedGroups(group);
    setGroupName("");
  };

  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <View
          style={{
            backgroundColor: "#f8e7f0",
            height: 40,
            width: 40,
            borderRadius: 20,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Ionicons name="add" size={30} color="#ffffff" />
        </View>
        <Text style={styles.HeadText}>Save Current Group</Text>
      </View>
      <View style={styles.inputRow}>
        <Text style={styles.text}>
          You have {itemLength} people in your current group. Save it for later!
        </Text>
      </View>
      {isSaveGroupClicked ? (
        <View style={styles.nameGroupLine}>
          <TextInput
            placeholder="Group"
            autoFocus
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            style={{
              width: "40%",
              borderWidth: focused ? 2 : 1,
              borderColor: focused ? "#e57db1" : lightTheme.border,
              padding: 10,
              borderRadius: 15,
              outlineWidth: 0,
            }}
            value={groupName}
            onChangeText={(value) => setGroupName(value)}
            onSubmitEditing={clickSave}
            returnKeyType="done"
          />
          <TouchableOpacity
            style={{
              backgroundColor: "#e57db1",
              padding: 8,
              paddingHorizontal: 15,
              borderRadius: 17,
            }}
            onPress={clickSave}
          >
            <Text
              style={{
                ...styles.buttonText,
                color: "white",
                fontSize: 15,
                fontWeight: "500",
              }}
            >
              Save
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              padding: 10,
              paddingHorizontal: 15,
              borderRadius: 17,
              borderWidth: 1,
              borderColor: lightTheme.border,
            }}
            onPress={() => {
              setIsSaveGroupClicked(false);
              setGroupName("");
            }}
          >
            <Text
              style={{
                ...styles.buttonText,
                color: "black",
                fontSize: 15,
                fontWeight: "500",
              }}
            >
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity style={styles.saveGroup} onPress={clickSaveGroup}>
          <Text style={styles.buttonText}>Save Group</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SaveGroupCard;

const styles = StyleSheet.create({
  card: {
    width: "90%",
    borderWidth: 3,
    borderColor: "#f8e7f0",
    padding: 15,
    backgroundColor: lightTheme.headerBackground,
    alignSelf: "center",
    marginTop: 30,
    marginBottom: 30,
    gap: 20,
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
  HeadText: { fontSize: 20 },
  image: {
    width: 45,
    height: 45,
  },
  text: {
    fontSize: 16,
    color: "#8b8b8b",
  },
  saveGroup: {
    backgroundColor: "#e57db1",
    padding: 10,
    borderRadius: 30,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
  },
  nameGroupLine: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
