import React from "react";
import { Pressable, StyleSheet } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import actionButtonStyles from "./styles";

type EditButtonProps = {
  id: string;
  onEdit: (id: string) => void;
};

const EditButton: React.FC<EditButtonProps> = ({ id, onEdit }) => (
  <Pressable
    onPress={() => onEdit(id)}
    style={({ pressed }) => [
      actionButtonStyles.actionBtn,
      editButtonStyles.editBtn,
      pressed && { opacity: 0.6 },
    ]}
  >
    <Feather name="edit-2" size={18} color="#2563eb" />
  </Pressable>
);

export default EditButton;

const editButtonStyles = StyleSheet.create({
  editBtn: {
    backgroundColor: "#bfdbfe",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
});
