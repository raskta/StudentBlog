import { FlatList, View, ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";
import { usePostsStore } from "@/src/stores/posts-store";
import PostCard from "../PostCard/PostCard";
import { Post } from "../../../../shared/interfaces/post";
import { useUsersStore } from "@/src/stores/users-store";

const ITEMS_PER_PAGE = 8;

export default function PostsList() {
  const allPosts = usePostsStore((state) => state.filteredPosts);
  const loading = usePostsStore((state) => state.loading);
  const fetchPosts = usePostsStore((state) => state.fetchPosts);
  const users = useUsersStore((s) => s.users);

  const [visiblePosts, setVisiblePosts] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const [onEndReachedCalledDuringMomentum, setOnEndReachedCalledDuringMomentum] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts, users]);

  useEffect(() => {
    setVisiblePosts(allPosts.slice(0, ITEMS_PER_PAGE));
    setPage(1);
  }, [allPosts]);

  function loadMore() {
    const nextPage = page + 1;
    const end = nextPage * ITEMS_PER_PAGE;

    if (allPosts.length > visiblePosts.length) {
      setVisiblePosts(allPosts.slice(0, end));
      setPage(nextPage);
    }
  }

  const ItemSeparator = () => <View style={{ height: 16 }} />;

  return (
    <View style={{ flex: 1 }}>
      {loading ? (
        <View style={{ padding: 16 }}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <FlatList
          style={{ flex: 1 }}
          data={visiblePosts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <PostCard
              titulo={item.titulo}
              id={item.id}
              subtitulo={item.subtitulo}
              usuario={item.usuario}
            />
          )}
          contentContainerStyle={{
            paddingTop: 16,
            paddingHorizontal: 2,
          }}
          ItemSeparatorComponent={ItemSeparator}
          showsVerticalScrollIndicator={false}
          onEndReached={() => {
            if (!onEndReachedCalledDuringMomentum) {
              loadMore();
              setOnEndReachedCalledDuringMomentum(true);
            }
          }}
          onEndReachedThreshold={0.2}
          onMomentumScrollBegin={() => {
            setOnEndReachedCalledDuringMomentum(false);
          }}
        />
      )}
    </View>
  );
}
