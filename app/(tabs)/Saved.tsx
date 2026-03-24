import DisplaySavedGroup from "@/components/DisplaySavedGroup";
import SaveGroupCard from "@/components/SavedGroupCard";
import useNameStore from "@/store/usenNamesStore";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

const Saved = function () {
  const items = useNameStore((state) => state.items);
  const isAnyGroupSaved = useNameStore((state) => state.isAnyGroupSaved);
  const savedGroups = useNameStore((state) => state.savedGroups);

  const [areNames, setAreNames] = useState(false);
  const [itemLength, setItemLength] = useState(0);

  useEffect(() => {
    if (items.length > 0) {
      setAreNames(true);
      setItemLength(items.length);
    } else {
      setAreNames(false);
      setItemLength(0);
    }
  }, [items]);
  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
    >
      {areNames && <SaveGroupCard items={items} itemLength={itemLength} />}
      {isAnyGroupSaved ? (
        <View>
          {savedGroups.map((each, key) => (
            <DisplaySavedGroup group={each} key={key} />
          ))}
        </View>
      ) : (
        <View style={styles.addName}>
          <View style={styles.imageContainer}>
            <Ionicons name="people-outline" size={70} color="#e57db1" />
          </View>
          <Text style={styles.headText}>No saved groups yet</Text>
          <Text style={styles.text}>
            Save your current group to quickly reuse it next time
          </Text>
        </View>
      )}
    </ScrollView>
  );
};

export default Saved;

const styles = StyleSheet.create({
  addName: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  imageContainer: {
    backgroundColor: "#f8e7f0",
    borderRadius: "50%",
    padding: 15,
    paddingHorizontal: 17,
  },
  image: {
    width: 90,
    height: 90,
  },
  headText: {
    fontSize: 20,
    fontWeight: "600",
  },
  text: {
    color: "#9a9795",
    textAlign: "center",
  },
});
