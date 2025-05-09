import { colors } from "@/src/theme/colors";
import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

type InputFieldProps = {
  label: string;
  value: string;
  onChangeValue: (text: string) => void;
  placeholder?: string;
  keyboardType?:
    | "default"
    | "numeric"
    | "number-pad"
    | "decimal-pad"
    | "email-address"
    | "phone-pad"
    | "url";
};

export default function InputField({
  label,
  value,
  onChangeValue,
  placeholder,
  keyboardType = "default",
}: InputFieldProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        editable
        multiline
        value={value}
        onChangeText={(text) => onChangeValue(text)}
        style={[styles.inputField, isFocused && styles.inputFieldFocused]}
        placeholder={placeholder}
        keyboardType={keyboardType}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
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
});
