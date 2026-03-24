import useNameStore from "@/store/usenNamesStore";
import { lightTheme } from "@/theme";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Group = {
  date: string;
  groupName: string;
  numberOfName: number;
  items: string[];
};

const DisplaySavedGroup = function ({ group }: { group: Group }) {
  const replaceItem = useNameStore((state) => state.replaceItem);
  const removeGroup = useNameStore((state) => state.removeGroup);
  return (
    <View style={styles.card}>
      <View style={styles.threeRow}>
        <View>
          <Text style={styles.title}>{group.groupName}</Text>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
            <Text style={styles.followingTxt}>{group.numberOfName} people</Text>
            <Text style={styles.followingTxt}>•</Text>
            <Text style={styles.followingTxt}>{group.date}</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.actions}
          onPress={() => {
            replaceItem(group.items);
            router.push("/(tabs)" as any);
          }}
        >
          <Ionicons name="copy-outline" size={18} color="#e57db1" />
          <Text>Load</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actions}
          onPress={() => removeGroup(group.groupName)}
        >
          <Ionicons name="trash-outline" size={18} color="red" />
        </TouchableOpacity>
      </View>
      <View style={styles.itemsList}>
        {group.items.slice(0, 5).map((each, key) => (
          <View key={key} style={styles.item}>
            <Text>{each}</Text>
          </View>
        ))}
        {group.items.length > 5 && <Text>+{group.items.length - 5} more</Text>}
      </View>
    </View>
  );
};

export default DisplaySavedGroup;

const styles = StyleSheet.create({
  card: {
    width: "90%",
    borderWidth: 3,
    borderColor: lightTheme.border,
    padding: 20,
    backgroundColor: lightTheme.headerBackground,
    alignSelf: "center",
    marginTop: 30,
    marginBottom: 30,
    gap: 25,
    borderRadius: 25,
  },
  threeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  title: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 5,
  },
  followingTxt: {
    color: "#8b8b8b",
  },

  actions: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: lightTheme.border,
    borderRadius: 15,
    padding: 6,
    paddingHorizontal: 10,
    backgroundColor: "#faf3f7",
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
  },

  itemsList: {
    flexDirection: "row",
    gap: 10,
    flexWrap: "wrap",
    alignItems: "center",
  },
  item: {
    borderWidth: 1,
    borderColor: lightTheme.border,
    borderRadius: 14,
    padding: 6,
    paddingHorizontal: 10,
    backgroundColor: "#f5e6ef",
  },
});
