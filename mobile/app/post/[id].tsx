import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { Post } from "../../../shared/interfaces/post";
import { usePostsStore } from "@/src/stores/posts-store";
import { ActivityIndicator, SafeAreaView, ScrollView, Text, View, StyleSheet } from "react-native";

export default function PostDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const idNum = Number(id);
  const navigation = useNavigation();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const getPostById = usePostsStore((s) => s.getPostById);

  useEffect(() => {
    setLoading(true);
    const fetched = getPostById(idNum);
    if (fetched) {
      setPost(fetched);
      navigation.setOptions({ title: fetched.titulo });
    }
    setLoading(false);
  }, [id, getPostById, navigation]);

  if (loading) {
    return (
      <SafeAreaView style={styles.centered}>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  if (!post) {
    return (
      <SafeAreaView style={styles.centered}>
        <Text style={styles.errorText}>Post não encontrado.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.flex}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text
            style={styles.dateBadge}
            accessibilityLabel="Data de criação"
          >
            {post.dtcriacao &&
              new Date(post.dtcriacao).toLocaleDateString("pt-BR", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
          </Text>
          {post.usuario && <Text accessibilityLabel="Autor do post">{post.usuario.nome}</Text>}
        </View>

        <View style={styles.info}>
          <Text style={styles.title}>{post.titulo}</Text>
          <Text style={styles.subtitle}>{post.subtitulo}</Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.text}>{post.conteudo}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    padding: 16,
    paddingBottom: 48,
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
    marginBottom: 16,
  },
  dateBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: "#bfdbfe",
    fontSize: 14,
  },
  errorText: {
    color: "#dc2626",
    fontSize: 16,
  },
  info: {
    alignItems: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 20,
    color: "#3f3f46",
    textAlign: "center",
    marginVertical: 8,
  },
  content: {
    marginTop: 16,
  },
  text: {
    fontSize: 14,
    lineHeight: 22,
    color: "#09090b",
  },
});
