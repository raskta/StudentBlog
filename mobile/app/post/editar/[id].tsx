import { usePostsStore } from "@/src/stores/posts-store";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, SafeAreaView, Text, View } from "react-native";
import { Post } from "../../../../shared/interfaces/post";
import { useLocalSearchParams, useNavigation } from "expo-router";
import globalStyles from "@/src/theme/styles";
import PostForm from "@/src/components/PostForm/PostForm";

export default function EditPost() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const idNum = Number(id);
  const getPostById = usePostsStore((s) => s.getPostById);
  const [loading, setLoading] = useState(true);
  const [fetchedPost, setFetchedPost] = useState<Post | undefined>(undefined);
  const navigation = useNavigation();

  useEffect(() => {
    const fetched = getPostById(idNum);

    if (fetched) {
      setFetchedPost(fetched);
      navigation.setOptions({ title: `Editando post: ${fetched.titulo}` });
    } else {
      setFetchedPost(undefined);
      navigation.setOptions({ title: "Post não encontrado" });
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
        <View
          style={{
            padding: 32,
          }}
        >
          <Text style={{ fontSize: 18, color: "crimson" }}>
            Post não foi encontrado, tente novamente ou selecione outro
            conteúdo.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={globalStyles.container}>
      <PostForm post={fetchedPost} />
    </SafeAreaView>
  );
}
