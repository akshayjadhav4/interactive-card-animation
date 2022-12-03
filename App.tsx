import { SafeAreaView, StyleSheet } from "react-native";
import Card from "./components/Card";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Card />
    </SafeAreaView>
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
