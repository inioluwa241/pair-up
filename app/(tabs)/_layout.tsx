import Header from "@/components/Header";
import useNameStore from "@/store/usenNamesStore";
import { Ionicons } from "@expo/vector-icons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { withLayoutContext } from "expo-router";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { Navigator } = createMaterialTopTabNavigator();
export const MaterialTopTabs = withLayoutContext(Navigator);

export default function TabsLayout() {
  const numberOfSavedGroups = useNameStore(
    (state) => state.numberOfSavedGroups,
  );
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header />

      <MaterialTopTabs
        screenOptions={({ route }) => ({
          tabBarIndicatorStyle: {
            backgroundColor: "#e57db1", // change color
          },
          tabBarActiveTintColor: "#e57db1",
          tabBarInactiveTintColor: "#9a9795",
          tabBarShowIcon: false,
          tabBarLabel: ({ color }) => {
            const icons: { [key: string]: any } = {
              index: "sparkles-outline",
              Saved: "bookmark-outline",
              History: "time-outline",
            };
            const titles: { [key: string]: any } = {
              index: "Matcher",
              Saved: `Saved${numberOfSavedGroups ? `(${numberOfSavedGroups})` : ""}`,
              History: "History",
            };
            return (
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 6 }}
              >
                <Ionicons name={icons[route.name]} size={18} color={color} />
                <Text style={{ color, fontSize: 14, fontWeight: "600" }}>
                  {titles[route.name]}
                </Text>
              </View>
            );
          },
        })}
      >
        <MaterialTopTabs.Screen name="index" options={{ title: "Matcher" }} />
        <MaterialTopTabs.Screen name="Saved" options={{ title: "Saved" }} />
        <MaterialTopTabs.Screen name="History" options={{ title: "History" }} />
      </MaterialTopTabs>
    </SafeAreaView>
  );
}
