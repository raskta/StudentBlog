import { useState } from "react";
import { Text, TextInput, View } from "react-native";
import { styles } from "./styles";

type InputFieldProps = {
  label: string;
  value: string;
  onChangeValue?: (text: string) => void;
  placeholder?: string;
  keyboardType?:
    | "default"
    | "numeric"
    | "number-pad"
    | "decimal-pad"
    | "email-address"
    | "phone-pad"
    | "url";
  disabled?: boolean;
};

export default function InputField({
  label,
  value,
  onChangeValue,
  placeholder,
  keyboardType = "default",
  disabled = false,
}: InputFieldProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        editable={!disabled}
        multiline
        value={value}
        onChangeText={(text) => {
          onChangeValue && onChangeValue(text);
        }}
        style={[
          styles.inputField,
          isFocused && styles.inputFieldFocused,
          disabled && styles.disabledInput,
        ]}
        placeholder={placeholder}
        keyboardType={keyboardType}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </View>
  );
}
