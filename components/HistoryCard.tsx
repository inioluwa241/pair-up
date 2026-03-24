import useNameStore from "@/store/usenNamesStore";
import { lightTheme } from "@/theme";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

// Call this once anywhere, e.g. in your App.tsx or index.tsx

const HistoryCard = function ({
  pairsPack,
}: {
  pairsPack: { title: string; namePairs: string[][]; date: string };
}) {
  const removeHistory = useNameStore((state) => state.removeHistory);
  const [showAll, setShowAll] = useState(false);
  // AsyncStorage.clear();

  return (
    <View style={styles.card}>
      <View style={styles.twoRow}>
        <View>
          <Text style={styles.title}>{pairsPack.title}</Text>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
            <Text style={styles.followingTxt}>{pairsPack.date}</Text>
            <Text style={styles.followingTxt}>•</Text>
            <Text style={styles.followingTxt}>
              {pairsPack.namePairs.length} Pair
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.actions}
          onPress={() => removeHistory(pairsPack.title)}
        >
          <Ionicons name="trash-outline" size={18} color="red" />
        </TouchableOpacity>
      </View>
      <View style={styles.pairList}>
        {(showAll ? pairsPack.namePairs : pairsPack.namePairs.slice(0, 3))?.map(
          (each, key) => (
            <View key={key} style={styles.matchedPair}>
              <View style={{ ...styles.names, justifyContent: "flex-start" }}>
                <View style={styles.circle}>
                  <Text style={styles.leftText}>
                    {each[0]?.charAt(0).toUpperCase()}
                  </Text>
                </View>

                <Text style={styles.matchedPairTxt}>{each[0]}</Text>
              </View>

              <Ionicons name="heart-outline" size={25} color="#e57db1" />

              <View style={{ ...styles.names, justifyContent: "flex-end" }}>
                <Text style={styles.matchedPairTxt}>{each[1]}</Text>
                <View
                  style={{
                    ...styles.circle,
                    backgroundColor: "#cfebec",
                  }}
                >
                  <Text style={styles.rightText}>
                    {each[1]?.charAt(0).toUpperCase()}
                  </Text>
                </View>
              </View>
            </View>
          ),
        )}
        {pairsPack.namePairs.length > 3 && !showAll && (
          <Text onPress={() => setShowAll(true)} style={{ color: "#e57db1" }}>
            +{pairsPack.namePairs.length - 3} more
          </Text>
        )}
        {pairsPack.namePairs.length > 3 && showAll && (
          <Text onPress={() => setShowAll(false)} style={{ color: "#e57db1" }}>
            Show less
          </Text>
        )}
      </View>
    </View>
  );
};

export default HistoryCard;

const styles = StyleSheet.create({
  card: {
    width: "90%",
    borderWidth: 3,
    borderColor: lightTheme.border,
    padding: 20,
    backgroundColor: lightTheme.headerBackground,
    alignSelf: "center",
    marginBottom: 10,
    gap: 10,
    borderRadius: 25,
  },
  twoRow: {
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
  pairList: {
    gap: 3,
    marginTop: 20,
    // marginBottom: 40,
  },
  actions: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: lightTheme.border,
    borderRadius: 15,
    padding: 4,
    paddingHorizontal: 10,
    backgroundColor: "#faf3f7",
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
  },
  matchedPair: {
    padding: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  matchedPairTxt: {
    fontSize: 15,
  },
  names: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    flex: 1,
  },
  circle: {
    height: 35,
    width: 35,
    borderRadius: 20,
    backgroundColor: "#f6e4ed",
    alignItems: "center",
    justifyContent: "center",
  },

  leftText: {
    color: "#e57db1",
    fontSize: 20,
  },
  rightText: {
    color: "black",
    fontSize: 20,
  },
});
