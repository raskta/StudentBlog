import { usePostsStore } from "@/src/stores/posts-store";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, SafeAreaView, Text, View } from "react-native";
import { Post } from "../../../../shared/interfaces/post";
import { useNavigation } from "expo-router";

export default function EditarPost(id: number | string) {
  const idNum = Number(id);
  const getPostById = usePostsStore((s) => s.getPostById);
  const [loading, setLoading] = useState(true);
  const [fetchedPost, setFetchedPost] = useState<Post | undefined>(undefined);
  const navigation = useNavigation();

  useEffect(() => {
    const fetched = getPostById(idNum);

    if (fetched) {
      setFetchedPost(fetched);
      navigation.setOptions({ title: fetched.titulo });
    } else {
      setFetchedPost(undefined);
      console.error(
        "Não foi possível encontrar o post para edição, tente novamente."
      );
    }
    setLoading(false);
  }, [id, getPostById, navigation]);

  if (loading) {
    return (
      <SafeAreaView>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  if (!fetchedPost) {
    return (
      <SafeAreaView>
        <Text>Post não encontrado.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView>
      <View>
        <Text>Editar post {fetchedPost.id}</Text>
        {/* Aqui o resto do formulário ou campos que quiser editar */}
      </View>
    </SafeAreaView>
  );
}
