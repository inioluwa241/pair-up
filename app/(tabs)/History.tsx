import HistoryCard from "@/components/HistoryCard";
import useNameStore from "@/store/usenNamesStore";
import { Ionicons } from "@expo/vector-icons";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const History = function () {
  const savedPairs = useNameStore((state) => state.savedPairs);
  const resetSavedPairs = useNameStore((state) => state.resetSavedPairs);
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      {savedPairs.length ? (
        <View>
          <View style={styles.historyHeader}>
            <Text style={styles.historyHeaderText}>Pair History</Text>
            <TouchableOpacity
              style={styles.clear}
              onPress={() => resetSavedPairs()}
            >
              <Ionicons name="trash-outline" size={16} color="red" />
              <Text style={styles.clearText}>Clear</Text>
            </TouchableOpacity>
          </View>
          {savedPairs.map((each, key) => (
            <View key={key}>
              <HistoryCard pairsPack={each} />
            </View>
          ))}
        </View>
      ) : (
        <View style={styles.addName}>
          <View style={styles.imageContainer}>
            <Ionicons name="people-outline" size={70} color="#e57db1" />
          </View>
          <Text style={styles.headText}>No match history yet</Text>
          <Text style={styles.text}>
            Your match results will appear here automatically{" "}
          </Text>
        </View>
      )}
    </ScrollView>
  );
};

export default History;

const styles = StyleSheet.create({
  historyHeader: {
    paddingVertical: 20,
    marginHorizontal: "5%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  historyHeaderText: {
    fontSize: 23,
    fontWeight: "600",
  },
  clear: {
    flexDirection: "row",
    gap: 10,
    borderRadius: 12,
    padding: 10,
    backgroundColor: "#faf3f7",
    alignItems: "center",
  },
  clearText: {
    color: "red",
    fontSize: 16,
  },
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
