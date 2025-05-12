import React, { useState } from "react";
import { ScrollView, Text, View, Pressable, StyleSheet, LayoutAnimation } from "react-native";
import { User } from "../../../../shared/interfaces/user";
import InputField from "../InputField/InputField";
import { colors } from "@/src/theme/colors";
import styles from "./styles";
import { styles as inputFieldStyles } from "@/src/components/InputField/styles";
import SubmitButton from "../SubmitButton/SubmitButton";

type UserFormProps = {
  user: User;
};

type UserRole = "Aluno" | "Professor";

const UserForm = ({ user }: UserFormProps) => {
  const [name, setName] = useState(user.nome ?? "");
  const [email, setEmail] = useState(user.email ?? "");
  const [role, setRole] = useState<UserRole>(user.role ?? "Aluno");
  const [active, setActive] = useState<boolean | null>(user.ativo || null);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [ativoDropdownVisible, setActiveDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setDropdownVisible((prev) => !prev);
  };

  const toggleActiveDropdown = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setActiveDropdownVisible((v) => !v);
  };

  const hasChangedFields = () => {
    if (!user) return true;
    return (
      user.nome !== name || user.email !== email || user.role !== role || user.ativo !== active
    );
  };

  const handleSelectRole = (value: UserRole) => {
    setRole(value);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setDropdownVisible(false);
  };
  const handleSelectActive = (value: boolean) => {
    setActive(value);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setActiveDropdownVisible(false);
  };

  // TODO: conectar com api edição usuário
  const handleSubmit = () => {};

  return (
    <ScrollView
      contentContainerStyle={styles.form}
      showsVerticalScrollIndicator={false}
    >
      <View>
        <Text style={inputFieldStyles.label}>ID</Text>
        <View style={[inputFieldStyles.inputField, inputFieldStyles.disabledInput]}>
          <Text>{user.id}</Text>
        </View>
      </View>
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

      {/* Dropdown Role */}
      <View>
        <Text style={pickerStyles.label}>Tipo de Usuário *</Text>
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
                onPress={() => handleSelectRole(option)}
              >
                <Text style={pickerStyles.optionText}>{option}</Text>
              </Pressable>
            ))}
          </View>
        )}
      </View>

      {/* Dropdown: Ativo */}
      <View>
        <Text style={pickerStyles.label}>Ativo *</Text>
        <Pressable
          style={pickerStyles.input}
          onPress={toggleActiveDropdown}
        >
          <Text style={pickerStyles.inputText}>
            {active === null ? "Selecione..." : active ? "Sim" : "Não"}
          </Text>
        </Pressable>
        {ativoDropdownVisible && (
          <View style={pickerStyles.dropdown}>
            {[
              { label: "Sim", value: true },
              { label: "Não", value: false },
            ].map((option) => (
              <Pressable
                key={option.label}
                style={pickerStyles.option}
                onPress={() => handleSelectActive(option.value)}
              >
                <Text style={pickerStyles.optionText}>{option.label}</Text>
              </Pressable>
            ))}
          </View>
        )}
      </View>
      <SubmitButton
        label={user ? "Atualizar usuário" : "Criar usuário"}
        onPress={handleSubmit}
        disabled={!hasChangedFields()}
      />
    </ScrollView>
  );
};

const pickerStyles = StyleSheet.create({
  label: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.darkBlue,
    marginBottom: 10,
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
