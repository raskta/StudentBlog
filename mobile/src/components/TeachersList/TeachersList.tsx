import { useEffect, useState } from "react";
import { PaginatedList } from "../PaginatedList/PaginatedList";
import mockUsers from "@/src/mocks/users";
import { User } from "../../../../shared/interfaces/user";
import UserCard from "./components/UserCard";
import { View } from "react-native";
import { useUsersStore } from "@/src/stores/users-store";
import { useRouter } from "expo-router";

const TeachersList = () => {
  const router = useRouter();
  const fetchUsers = useUsersStore((s) => s.fetchUsers);
  const loading = useUsersStore((s) => s.loading);
  const users = useUsersStore((s) => s.users);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers, users]);

  const ItemSeparator = () => <View style={{ height: 16 }} />;

  // User actions
  const handleEdit = (id: number) => {
    router.push(`/user/editar/${id}`);
  };
  const handleDelete = () => {};

  return (
    <PaginatedList<User>
      data={users}
      loading={loading}
      keyExtractor={(user) => user.id.toString()}
      fetchData={() => {}}
      renderItem={({ item }) => {
        return (
          <UserCard
            nome={item.nome}
            id={item.id}
            ativo={item.ativo}
            email={item.email}
            role={item.role}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        );
      }}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default TeachersList;
