import React, { useState, useEffect, useRef } from "react";
import {
  ScrollView,
  Text,
  View,
  Pressable,
  StyleSheet,
  LayoutAnimation,
  Platform,
  UIManager,
} from "react-native";
import { User } from "../../../../shared/interfaces/user";
import InputField from "../InputField/InputField";
import styles from "./styles";
import { colors } from "@/src/theme/colors";

type UserFormProps = {
  user: User;
};

type UserRole = "Aluno" | "Professor";

const UserForm = ({ user }: UserFormProps) => {
  const [name, setName] = useState(user.nome ?? "");
  const [email, setEmail] = useState(user.email ?? "");
  const [role, setRole] = useState<UserRole>(user.role ?? "Aluno");
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setDropdownVisible((prev) => !prev);
  };

  const handleSelect = (value: UserRole) => {
    setRole(value);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setDropdownVisible(false);
  };

  return (
    <ScrollView
      contentContainerStyle={styles.form}
      showsVerticalScrollIndicator={false}
    >
      <InputField
        label="Nome *"
        value={name}
        keyboardType="default"
        placeholder="Insira o nome"
        onChangeValue={setName}
      />
      <InputField
        label="Email"
        value={email}
        keyboardType="email-address"
        placeholder="Insira o email"
        onChangeValue={setEmail}
      />

      <View>
        <Text style={pickerStyles.label}>Tipo de Usuário</Text>
        <Pressable
          style={pickerStyles.input}
          onPress={toggleDropdown}
        >
          <Text style={pickerStyles.inputText}>{role}</Text>
        </Pressable>

        {dropdownVisible && (
          <View style={pickerStyles.dropdown}>
            {(["Aluno", "Professor"] as UserRole[]).map((option) => (
              <Pressable
                key={option}
                style={pickerStyles.option}
                onPress={() => handleSelect(option)}
              >
                <Text style={pickerStyles.optionText}>{option}</Text>
              </Pressable>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const pickerStyles = StyleSheet.create({
  label: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.darkBlue,
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#f2f2f2",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 8,
  },
  inputText: {
    fontSize: 14,
  },
  dropdown: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginTop: 4,
    overflow: "hidden",
  },
  option: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  optionText: {
    fontSize: 16,
  },
});

export default UserForm;
