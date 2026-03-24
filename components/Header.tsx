import useNameStore from "@/store/usenNamesStore";
import { lightTheme } from "@/theme";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Header = function () {
  const Item = useNameStore((state) => state.items);
  const resetItem = useNameStore((state) => state.resetItem);
  return (
    <View style={styles.header}>
      <View style={styles.pairUp}>
        <View style={styles.circle}>
          <Ionicons name="heart-outline" size={25} color="#e57db1" />
        </View>

        <Text style={styles.headText}>pair up</Text>
      </View>
      {Item.length > 0 && (
        <TouchableOpacity>
          <Text style={styles.clearAll} onPress={() => resetItem()}>
            Clear All
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: lightTheme.border,
    backgroundColor: lightTheme.headerBackground,

    padding: 20,
    alignItems: "center",
    justifyContent: "space-between",
  },
  circle: {
    height: 45,
    width: 45,
    borderRadius: 22.5,
    backgroundColor: "#f6e4ed",
    alignItems: "center",
    justifyContent: "center",
  },
  pairUp: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  image: {
    width: 45,
    height: 45,
  },
  headText: {
    fontSize: 35,
    textTransform: "capitalize",
  },
  clearAll: {
    fontSize: 25,
  },
});
