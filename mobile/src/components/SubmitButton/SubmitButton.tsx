// components/SubmitButton.tsx
import React from "react";
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from "react-native";

interface SubmitButtonProps {
  onPress: () => void;
  disabled?: boolean;
  label: string;
  style?: ViewStyle;
}

export default function SubmitButton({
  onPress,
  disabled = false,
  label,
  style,
}: SubmitButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.button, disabled ? styles.disabled : null, style]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#60a5fa",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  disabled: {
    backgroundColor: "#93c5fd",
    opacity: 0.7,
  },
  text: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
