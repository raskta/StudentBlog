import { useEffect } from "react";
import { PaginatedList } from "../PaginatedList/PaginatedList";
import { User } from "../../../../shared/interfaces/user";
import UserCard from "./components/UserCard";
import { Alert, View } from "react-native";
import { useUsersStore } from "@/src/stores/users-store";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";

const UsersList = () => {
  const router = useRouter();
  const fetchUsers = useUsersStore((s) => s.fetchUsers);
  const loading = useUsersStore((s) => s.loading);
  const users = useUsersStore((s) => s.users);
  const deleteUser = useUsersStore((s) => s.deleteUser);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const ItemSeparator = () => <View style={{ height: 16 }} />;

  const handleEdit = (id: number) => {
    router.push(`/user/editar/${id}`);
  };

  const handleDelete = (id: number, name: string) => {
    Alert.alert(`Excluir usuário`, `Realmente deseja o usuário: "${id} - ${name}"`, [
      { text: "Não", style: "cancel" },
      {
        text: "Sim",
        onPress() {
          deleteUser(id);
          Toast.show({
            type: "success",
            text1: "Usuário removido",
            text2: `${name} removido com sucesso`,
          });
        },
        style: "destructive",
      },
    ]);
  };

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
            onEdit={() => handleEdit(item.id)}
            onDelete={() => handleDelete(item.id, item.nome)}
          />
        );
      }}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default UsersList;
