import { Button, ScrollView, StyleSheet } from "react-native";
import { Post } from "../../../../shared/interfaces/post";
import { useState } from "react";
import InputField from "./components/InputField/InputField";
import Toast from "react-native-toast-message";

//TODO: implementar edicao de post, update, ja esta na posts-store

type PostFormProps = {
  post?: Partial<Post>;
  // onSubmit: (formData: { post: Partial<Post> }) => void;
  //   submitLabel: string;
};

export default function PostForm({ post }: PostFormProps) {
  const [title, onChangeTitle] = useState(post?.titulo ?? "");
  const [subtitle, onChangeSubtitle] = useState(post?.subtitulo ?? "");
  const [content, onChangeContent] = useState(post?.conteudo ?? "");

  const hasChangedFields = () => {
    if (!post) return true;
    return (
      post.titulo !== title ||
      post.subtitulo !== subtitle ||
      post.conteudo !== content
    );
  };

  const handleSubmit = () => {
    const newFormData: Partial<Post> = {
      titulo: title,
      subtitulo: subtitle,
      conteudo: content,
    };

    console.log("Form data enviada:", newFormData);

    // onSubmit(newFormData);

    Toast.show({
      type: "success",
      text1: `${post?.titulo} alterado com sucesso!`,
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.form}>
      <InputField
        label={"Título"}
        value={title}
        onChangeValue={onChangeTitle}
        placeholder="Insira o título"
        keyboardType="default"
      />
      <InputField
        label="Subtítulo"
        onChangeValue={onChangeSubtitle}
        value={subtitle}
        keyboardType="default"
        placeholder="Insira o subtítulo"
      />
      <InputField
        label="Conteúdo"
        onChangeValue={onChangeContent}
        value={content}
        keyboardType="default"
        placeholder="Insira o conteúdo"
      />
      <Button
        title="Finalizar edição"
        color={"#60a5fa"}
        accessibilityLabel="Finalizar edição da postagem clicando nesse botão"
        onPress={handleSubmit}
        disabled={!hasChangedFields()}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  form: {
    flex: 1,
    gap: 24,
  },
});
