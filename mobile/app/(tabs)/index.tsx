import { Image, StyleSheet, Text, View } from "react-native";
import PostsList from "@/src/components/PostsList/PostList";
import globalStyles from "../../src/theme/styles";
import SearchBar from "@/src/components/SearchBar/SearchBar";
import { SafeAreaView } from "react-native-safe-area-context";
import { usePostsStore } from "@/src/stores/posts-store";
import { colors } from "@/src/theme/colors";
import { useEffect } from "react";

export default function Index() {
  const posts = usePostsStore((s) => s.posts);
  const fetchPosts = usePostsStore((s) => s.fetchPosts);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <SafeAreaView style={globalStyles.container}>
      {/* Header */}
      <View style={{ display: "flex", flexDirection: "row", gap: 16 }}>
        <Text style={globalStyles.mainTitle}>Student Blog</Text>
        <Image
          source={require("@/src/assets/images/logo.png")}
          style={{
            width: 36,
            height: 36,
          }}
        />
      </View>

      {/* Barra de busca */}
      {posts.length > 0 && <SearchBar />}

      {/* Posts */}
      {posts.length > 0 ? (
        <PostsList />
      ) : (
        <View style={styles.noPosts}>
          <Text style={styles.noPostsText}>Não existem postagens para exibir</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  noPosts: {
    marginTop: 24,
  },
  noPostsText: {
    fontSize: 18,
    color: colors.darkBlue,
  },
});
