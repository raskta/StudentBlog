import { colors } from "@/src/theme/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  label: {
    fontWeight: "bold",
    marginBottom: 8,
    color: colors.darkBlue,
  },
  inputField: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
    maxHeight: 320,
    textAlignVertical: "top",
  },
  inputFieldFocused: {
    borderColor: "#007bff",
    backgroundColor: "#f0f8ff",
  },
  disabledInput: {
    backgroundColor: "#ccc",
  },
});
