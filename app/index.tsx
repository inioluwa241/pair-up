import AddPeopleCard from "@/components/AddPeopleCard";
import Display from "@/components/Display";
import Header from "@/components/Header";
import { lightTheme } from "@/theme";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView>
      <Header />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.screen}>
          <AddPeopleCard />
          <Display />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: lightTheme.background,
    flex: 1,
  },
});
