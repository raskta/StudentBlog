import PostForm from "@/src/components/PostForm/PostForm";
import globalStyles from "@/src/theme/styles";
import { useNavigation } from "expo-router";
import { useEffect } from "react";
import { SafeAreaView, Text, View } from "react-native";

// Implementar criação de post

export default function CreatePost() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ title: "Criar post" });
  });
  return (
    <SafeAreaView style={globalStyles.container}>
      <PostForm />
    </SafeAreaView>
  );
}
