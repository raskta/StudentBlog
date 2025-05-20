import React, { useEffect } from "react";
import { ActivityIndicator, SafeAreaView, Text, View } from "react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { usePostsStore } from "@/src/stores/posts-store";
import globalStyles from "@/src/theme/styles";
import PostForm from "@/src/components/PostForm/PostForm";
import { Post } from "../../../../shared/interfaces/post";

export default function EditPost() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const postId = Number(id);
  const navigation = useNavigation();

  const post = usePostsStore((s) => s.getPostById(postId));

  useEffect(() => {
    if (post) {
      navigation.setOptions({ title: `Editando: ${post.titulo}` });
    } else {
      navigation.setOptions({ title: "Post não encontrado" });
    }
  }, [navigation, post]);

  if (post === undefined) {
    return (
      <SafeAreaView style={globalStyles.centered}>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  if (post === null) {
    return (
      <SafeAreaView style={globalStyles.centered}>
        <Text style={globalStyles.errorText}>Post não encontrado. Volte e tente outro.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[globalStyles.container, { paddingBottom: 24 }]}>
      <PostForm post={post} />
    </SafeAreaView>
  );
}
