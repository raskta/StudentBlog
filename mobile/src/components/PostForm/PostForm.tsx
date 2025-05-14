import { ScrollView, StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import { Post } from "../../../../shared/interfaces/post";
import { useState } from "react";
import InputField from "../InputField/InputField";
import Toast from "react-native-toast-message";
import { pickImage } from "@/src/utils/pickImage";
import SubmitButton from "../SubmitButton/SubmitButton";
import { usePostsStore } from "@/src/stores/posts-store";

type PostFormProps = {
  post?: Partial<Post>;
};

export default function PostForm({ post }: PostFormProps) {
  const [title, onChangeTitle] = useState(post?.titulo ?? "");
  const [subtitle, onChangeSubtitle] = useState(post?.subtitulo ?? "");
  const [content, onChangeContent] = useState(post?.conteudo ?? "");
  const [image, setImage] = useState<{
    uri: string;
    type: string;
    name: string;
  } | null>(null);

  const { updatePost } = usePostsStore();

  const hasChangedFields = () => {
    if (!post) return true;
    return (
      post.titulo !== title ||
      post.subtitulo !== subtitle ||
      post.conteudo !== content ||
      image != null
    );
  };

  const handlePickImage = async () => {
    const result = await pickImage();

    if (!result.success) {
      Toast.show({
        type: "error",
        text1: "Erro na seleção",
        text2: result.error || "Erro desconhecido",
      });
      return;
    }

    if (result.image) {
      setImage(result.image);
    }
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
      if (!post?.id) {
        throw new Error("O id fornecido para edição não existe");
      }

      const updatedFields: Record<string, any> = {
        titulo: title,
        subtitulo: subtitle,
        conteudo: content,
      };

      await updatePost(post.id, updatedFields);

      Toast.show({
        type: "success",
        text1: "Post atualizado com sucesso!",
      });
    } catch (error) {
      console.error(error);
      Toast.show({
        type: "error",
        text1: "Erro ao editar o post",
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
      <View>
        <TouchableOpacity
          style={styles.imageButton}
          onPress={handlePickImage}
          activeOpacity={0.7}
        >
          <Text style={styles.buttonText}>📷 Selecionar Imagem</Text>
        </TouchableOpacity>

        {image ? (
          <View style={styles.previewContainer}>
            <Text>Pré-visualização:</Text>
            <Image
              source={{ uri: image.uri }}
              style={styles.previewImage}
            />
          </View>
        ) : (
          <Text style={styles.noImageText}>Nenhuma imagem selecionada</Text>
        )}
      </View>
      <SubmitButton
        label={post ? "Atualizar Post" : "Criar Post"}
        onPress={handleSubmit}
        disabled={!hasChangedFields()}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  form: {
    gap: 24,
    padding: 16,
  },
  previewContainer: {
    marginTop: 8,
    alignItems: "center",
  },
  previewImage: {
    width: 200,
    height: 200,
    marginTop: 8,
    borderRadius: 8,
  },
  noImageText: {
    color: "#666",
    textAlign: "center",
    marginTop: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  imageButton: {
    backgroundColor: "#60a5fa",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
});
