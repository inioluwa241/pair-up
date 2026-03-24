import AddPeopleCard from "@/components/AddPeopleCard";
import Display from "@/components/Display";
import { lightTheme } from "@/theme";
import { ScrollView, StyleSheet, View } from "react-native";

export default function Index() {
  // AsyncStorage.clear();

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <View>
        <View style={styles.screen}>
          <AddPeopleCard />
          <Display />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: lightTheme.background,
    flex: 1,
  },
});
