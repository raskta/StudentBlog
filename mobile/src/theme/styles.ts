import { StyleSheet } from "react-native";

const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  mainTitle: {
    textAlign: "left",
    fontSize: 24,
    fontWeight: "bold",
    color: "#172554",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default globalStyles;
