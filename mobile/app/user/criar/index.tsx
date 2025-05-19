import UserForm from "@/src/components/UserForm/UserForm";
import globalStyles from "@/src/theme/styles";
import { useNavigation } from "expo-router";
import { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const CreateUserScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ title: "Criar Usuário" });
  });

  return (
    <SafeAreaView style={globalStyles.container}>
      <UserForm />
    </SafeAreaView>
  );
};

export default CreateUserScreen;
