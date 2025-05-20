import { FlatList, View, ActivityIndicator, Alert } from "react-native";
import { useEffect, useState } from "react";
import { usePostsStore } from "@/src/stores/posts-store";
import PostCard from "../PostCard/PostCard";
import { useRouter } from "expo-router";
import { shallow } from "zustand/shallow";
import Toast from "react-native-toast-message";

const ITEMS_PER_PAGE = 8;

export default function PostList() {
  const allPosts = usePostsStore((state) => state.posts);
  const loading = usePostsStore((state) => state.loading);
  const fetchPosts = usePostsStore((state) => state.fetchPosts);
  const deletePost = usePostsStore((state) => state.deletePost);

  const router = useRouter();
  const [visiblePosts, setVisiblePosts] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [onEndReachedCalledDuringMomentum, setOnEndReachedCalledDuringMomentum] = useState(false);

  // roda só uma vez
  useEffect(() => {
    fetchPosts();
  }, []);

  // atualiza paginação quando os posts chegam
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

  const onEdit = (id: number) => {
    router.push(`/post/editar/${id}`);
  };

  const onDelete = (id: number, title: string) => {
    Alert.alert(`Excluir postagem`, `Realmente deseja excluir a postagem: "${id} - ${title}"`, [
      { text: "Não", style: "cancel" },
      {
        text: "Sim",
        onPress() {
          deletePost(id);
          Toast.show({
            type: "success",
            text1: "Post removido",
            text2: `${title} removido com sucesso`,
          });
        },
        style: "destructive",
      },
    ]);
  };

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
              editable
              onEdit={onEdit}
              onDelete={onDelete}
            />
          )}
          contentContainerStyle={{ paddingVertical: 16, paddingHorizontal: 2 }}
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
