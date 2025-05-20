import { ScrollView } from "react-native";
import { Post } from "../../../../shared/interfaces/post";
import { useEffect, useState } from "react";
import InputField from "../InputField/InputField";
import Toast from "react-native-toast-message";
import SubmitButton from "../SubmitButton/SubmitButton";
import { CreatePostRequestFields, usePostsStore } from "@/src/stores/posts-store";
import { useAuthStore } from "@/src/stores/auth-store";
import { styles } from "./styles";
import { useRouter } from "expo-router";

type PostFormProps = {
  post?: Partial<Post>;
};

export default function PostForm({ post }: PostFormProps) {
  const loggedUser = useAuthStore((s) => s.loggedUser);
  const router = useRouter();
  const [title, onChangeTitle] = useState(post?.titulo ?? "");
  const [subtitle, onChangeSubtitle] = useState(post?.subtitulo ?? "");
  const [content, onChangeContent] = useState(post?.conteudo ?? "");
  const [author, setAuthor] = useState(post?.usuario);
  const [image, setImage] = useState<{
    uri: string;
    type: string;
    name: string;
  } | null>(null);

  const { createPost, updatePost } = usePostsStore();

  useEffect(() => {
    author ?? setAuthor(loggedUser);
  }, [loggedUser, author, post]);

  const hasChangedFields = () => {
    if (!post) return true;
    return (
      post.titulo !== title ||
      post.subtitulo !== subtitle ||
      post.conteudo !== content ||
      image != null
    );
  };

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) {
      Toast.show({
        type: "error",
        text1: "Campos obrigatórios",
        text2: "Preencha o título e o conteúdo para continuar",
      });
      return;
    }

    try {
      if (post?.id) {
        const updatePayload: Partial<CreatePostRequestFields> = {
          titulo: title,
          subtitulo: subtitle,
          conteudo: content,
        };

        await updatePost(post.id, updatePayload);

        Toast.show({
          type: "success",
          text1: "Post atualizado",
          text2: `“${title}” atualizado com sucesso`,
        });
      } else {
        const createPayload: CreatePostRequestFields = {
          titulo: title,
          subtitulo: subtitle,
          conteudo: content,
          idusuario: author!.id.toString(),
          imagem: "",
        };

        const createdPost = await createPost(createPayload);

        Toast.show({
          type: "success",
          text1: "Post criado",
          text2: `“${createdPost.titulo}” criado com sucesso`,
        });

        router.replace("/(tabs)/gerenciamento-posts");
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Erro desconhecido, tente novamente";

      console.error("[PostForm] handleSubmit:", err);

      Toast.show({
        type: "error",
        text1: post?.id ? "Erro ao atualizar post" : "Erro ao criar post",
        text2: message,
      });
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.form}
      showsVerticalScrollIndicator={false}
    >
      <InputField
        label="Título *"
        value={title}
        onChangeValue={onChangeTitle}
        placeholder="Insira o título"
        keyboardType="default"
      />
      <InputField
        label="Subtítulo"
        value={subtitle}
        onChangeValue={onChangeSubtitle}
        placeholder="Insira o subtítulo"
        keyboardType="default"
      />
      <InputField
        label="Conteúdo *"
        value={content}
        onChangeValue={onChangeContent}
        placeholder="Insira o conteúdo"
        keyboardType="default"
      />
      {author && (
        <InputField
          label="Autor"
          onChangeValue={() => {}}
          value={author.nome}
          disabled
        />
      )}
      <SubmitButton
        label={post ? "Atualizar Post" : "Criar Post"}
        onPress={handleSubmit}
        disabled={!hasChangedFields()}
      />
    </ScrollView>
  );
}
