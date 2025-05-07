import { useEffect, useState } from "react";
import { PaginatedList } from "../PaginatedList/PaginatedList";
import mockUsers from "@/src/mocks/users";
import { User } from "../../../../shared/interfaces/user";
import UserCard from "./components/UserCard";
import { View } from "react-native";

const TeachersList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  // Simulando fetch, extraindo da mock de users
  useEffect(() => {
    setTimeout(() => {
      setUsers(mockUsers);
      setLoading(false);
    }, 500);
  }, []);

  const ItemSeparator = () => <View style={{ height: 16 }} />;

  // User actions
  const handleEdit = () => {};
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
