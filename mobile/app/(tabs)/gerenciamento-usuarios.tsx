import CreateButton from "@/src/components/ActionButtons/CreateButton";
import UsersList from "@/src/components/UsersList/UsersList";
import globalStyles from "@/src/theme/styles";
import { Link } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function GerenciamentoUsuarios() {
  return (
    <SafeAreaView style={globalStyles.container}>
      <Text style={globalStyles.mainTitle}>Gerenciamento de Usuários</Text>
      <View>
        <Link
          href="/user/criar"
          asChild
        >
          <CreateButton label="Criar Usuário" />
        </Link>
      </View>
      <UsersList />
    </SafeAreaView>
  );
}
