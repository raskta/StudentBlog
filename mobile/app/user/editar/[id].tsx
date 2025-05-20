import { useUsersStore } from "@/src/stores/users-store";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { User } from "../../../../shared/interfaces/user";
import { ActivityIndicator, SafeAreaView, Text } from "react-native";
import globalStyles from "@/src/theme/styles";
import UserForm from "@/src/components/UserForm/UserForm";

const EditUser = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const idNum = Number(id);
  const getUserById = useUsersStore((s) => s.getUserById);
  const loading = useUsersStore((s) => s.loading);
  const navigation = useNavigation();
  const [fetchedUser, setFetchedUser] = useState<User | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const user = await getUserById(idNum);
        if (user) {
          setFetchedUser(user);
          navigation.setOptions({
            title: `Editando: ${user.nome} | ${user.role}`,
          });
        }
      } catch (err) {
        console.error("Erro ao buscar usuário:", err);
      }
    };

    loadUser();
  }, [idNum]);

  if (loading) {
    return (
      <SafeAreaView style={globalStyles.container}>
        <ActivityIndicator size={"large"} />
      </SafeAreaView>
    );
  }

  if (fetchedUser) {
    return (
      <SafeAreaView style={globalStyles.container}>
        <UserForm user={fetchedUser} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={globalStyles.container}>
      <Text>Usuário não encontrado, tente novamente.</Text>
    </SafeAreaView>
  );
};

export default EditUser;
