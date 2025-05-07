import React from "react";
import { Pressable, StyleSheet } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import actionButtonStyles from "./styles";

type DeleteButtonProps = {
  id: string;
  titulo?: string;
  onDelete: (id: string, titulo: string) => void;
};

const DeleteButton: React.FC<DeleteButtonProps> = ({
  id,
  titulo = "",
  onDelete,
}) => (
  <Pressable
    onPress={() => onDelete(id, titulo)}
    style={({ pressed }) => [
      actionButtonStyles.actionBtn,
      deleteButtonStyle.deleteBtn,
      pressed && { opacity: 0.6 },
    ]}
  >
    <Feather name="trash-2" size={18} color="#dc2626" />
  </Pressable>
);

export default DeleteButton;

const deleteButtonStyle = StyleSheet.create({
  deleteBtn: {
    backgroundColor: "#fecaca",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
});
