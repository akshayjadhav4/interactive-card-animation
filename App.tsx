import { SafeAreaView, StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Card from "./components/Card";

export default function App() {
  return (
    // for Android
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <Card />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
