import useNameStore from "@/store/usenNamesStore";
import { lightTheme } from "@/theme";
import { Ionicons } from "@expo/vector-icons";
import { useCallback, useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Display = function () {
  const items = useNameStore((state) => state.items);
  const itemHasBeenReset = useNameStore((state) => state.itemHasBeenReset);
  const namePairs = useNameStore((state) => state.namePairs);
  const addPair = useNameStore((state) => state.addPair);
  const removeName = useNameStore((state) => state.removeName);
  const updateSavedPairs = useNameStore((state) => state.updateSavedPairs);
  const savedPairs = useNameStore((state) => state.savedPairs);

  const [areNames, setAreNames] = useState(false);
  const [numberOfNames, setNumberOfNames] = useState(0);
  const [isPaired, setIsPaired] = useState(false);
  const [leftOutVal, setLeftOutVal] = useState<string | null>(null);

  useEffect(() => {
    if (items.length > 0) {
      setAreNames(true);
      setNumberOfNames(items.length);
    } else {
      setAreNames(false);
      setIsPaired(false);
      setNumberOfNames(items.length);
    }
  }, [items]);

  const matchFunction = useCallback(
    function () {
      const shuffled = [...items].sort(() => Math.random() - 0.5);

      const namePairs: string[][] = [];

      for (let i = 0; i < numberOfNames - 1; i += 2) {
        namePairs.push([shuffled[i], shuffled[i + 1]]);
      }
      const title = `Match ${savedPairs.length + 1}`;
      const formatDate = (timestamp: number) => {
        return new Date(timestamp).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        });
      };
      const date = formatDate(Date.now());
      addPair(namePairs);
      updateSavedPairs({ title, namePairs, date });

      const leftOut =
        shuffled.length % 2 !== 0 ? shuffled[shuffled.length - 1] : null;
      setLeftOutVal(leftOut);
      setIsPaired(true);
    },
    [items, numberOfNames, addPair],
  );

  useEffect(() => {
    if (itemHasBeenReset === true) {
      matchFunction();
    } else {
      useNameStore.setState({ itemHasBeenReset: false });
    }
  }, [itemHasBeenReset, matchFunction]);

  return (
    <View style={styles.display}>
      {areNames ? (
        <View>
          <View style={styles.pLine}>
            <Text style={styles.people}>People ({numberOfNames})</Text>
            {numberOfNames % 2 !== 0 && (
              <Text style={styles.oddText}>Odd number - one will be solo</Text>
            )}
          </View>
          <View style={styles.list}>
            {items.map((each, key) => (
              <View key={key} style={styles.eachName}>
                <Text style={styles.eachNameText}>{each}</Text>
                <TouchableOpacity
                  onPress={() => removeName(each)}
                  style={{
                    backgroundColor: "#f9eff5",
                    alignItems: "center",
                    justifyContent: "center",
                    height: 25,
                    width: 25,
                    borderRadius: 12.5,
                  }}
                >
                  <Ionicons name="close" size={12} color="#9a9795" />
                </TouchableOpacity>
              </View>
            ))}
          </View>

          <View>
            {isPaired ? (
              <View>
                <View style={styles.matchedPairHead}>
                  <Ionicons name="sparkles-outline" size={25} color="#e57db1" />
                  <Text style={styles.matchedPairText}>Matched Pairs</Text>
                </View>
                <View style={styles.pairList}>
                  {namePairs.map((each, index) => (
                    <View key={index} style={styles.matchedPair}>
                      <View style={styles.names}>
                        <View style={styles.circle}>
                          <Text style={styles.leftText}>
                            {each[0].charAt(0).toUpperCase()}
                          </Text>
                        </View>

                        <Text style={styles.matchedPairTxt}>{each[0]}</Text>
                      </View>
                      <View style={styles.iconCircle}>
                        <Ionicons
                          name="heart-outline"
                          size={30}
                          color="white"
                        />
                      </View>

                      <View style={styles.names}>
                        <Text style={styles.matchedPairTxt}>{each[1]}</Text>
                        <View
                          style={{
                            ...styles.circle,
                            backgroundColor: "#cfebec",
                          }}
                        >
                          <Text style={styles.rightText}>
                            {each[1].charAt(0).toUpperCase()}
                          </Text>
                        </View>
                      </View>
                    </View>
                  ))}

                  {leftOutVal && (
                    <View style={styles.leftOut}>
                      <View style={styles.circle}>
                        <Text style={styles.leftText}>
                          {leftOutVal.charAt(0).toUpperCase()}
                        </Text>
                      </View>

                      <Text style={styles.matchedPairTxt}>{leftOutVal}</Text>
                    </View>
                  )}
                </View>
                <TouchableOpacity
                  style={styles.shuffleButton}
                  onPress={matchFunction}
                >
                  <Ionicons name="shuffle" size={25} color="black" />
                  <Text>Shuffle Again</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View>
                {numberOfNames >= 2 && (
                  <TouchableOpacity
                    style={styles.matchButton}
                    onPress={matchFunction}
                  >
                    <Ionicons name="sparkles-outline" size={25} color="white" />
                    <Text style={styles.buttonText}>Match Everyone!</Text>
                  </TouchableOpacity>
                )}
              </View>
            )}
          </View>
        </View>
      ) : (
        <View style={styles.addName}>
          <View style={styles.imageContainer}>
            <Ionicons name="people" size={70} color="white" />
          </View>
          <Text style={styles.headText}>Add some people</Text>
          <Text style={styles.text}>
            Enter at least 2 names to create random pairs and matches
          </Text>
        </View>
      )}
    </View>
  );
};

export default Display;

const styles = StyleSheet.create({
  display: {
    width: "90%",
    alignSelf: "center",
  },
  list: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 50,
  },

  people: {
    fontSize: 20,
  },

  eachName: {
    borderWidth: 1,
    borderColor: lightTheme.border,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 30,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  eachNameText: {
    fontSize: 15,
    fontWeight: "600",
  },

  pLine: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  oddText: {
    padding: 5,
    paddingHorizontal: 8,
    borderRadius: 12,
    backgroundColor: "#e9c992",
  },

  addName: {
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  imageContainer: {
    backgroundColor: "#e57db1",
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
  matchButton: {
    backgroundColor: "#e57db1",
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
    padding: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "600",
  },

  matchedPairHead: {
    flexDirection: "row",
    gap: 10,
  },
  matchedPairText: {
    fontSize: 20,
    fontWeight: "600",
  },
  pairList: {
    gap: 20,
    marginTop: 20,
    marginBottom: 40,
  },
  matchedPair: {
    borderWidth: 1,
    borderColor: "#e57db1",
    borderRadius: 20,
    padding: 20,
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
  },
  circle: {
    height: 40,
    width: 40,
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

  iconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25, // ← must be a number, half of width/height
    backgroundColor: "#e57db1",
    justifyContent: "center",
    alignItems: "center",
  },
  shuffleButton: {
    borderWidth: 1,
    borderColor: lightTheme.border,
    borderRadius: 20,
    paddingVertical: 15,
    paddingHorizontal: 12,
    marginBottom: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  leftOut: {
    width: "50%",
    gap: 10,
    borderWidth: 1,
    borderColor: "#e57db1",
    borderRadius: 20,
    padding: 20,
    flexDirection: "row",
    // justifyContent: "space-between",
    alignItems: "center",
  },
});
