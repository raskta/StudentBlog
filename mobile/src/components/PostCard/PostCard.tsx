import { Text, View, Pressable, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Post } from "../../../../shared/interfaces/post";
import { colors } from "@/src/theme/colors";

export default function PostCard({
  titulo,
  id,
  subtitulo,
  usuario,
}: Partial<Post>) {
  const router = useRouter();

  function handlePress(id: number | undefined) {
    if (!id) return;
    router.push(`/post/${id}`);
  }

  return (
    <Pressable
      onPress={() => handlePress(id)}
      style={({ pressed }) => [
        styles.cardContainer,
        {
          backgroundColor: pressed ? "#f0f0f0" : "#ffffff",
        },
      ]}
    >
      <View style={styles.card}>
        <View style={styles.content}>
          <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
            {titulo}
          </Text>
          <Text style={styles.user}>{usuario?.nome}</Text>
        </View>
        {subtitulo && (
          <View style={{ paddingTop: 8 }}>
            <Text
              style={styles.subtitle}
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {subtitulo}
            </Text>
          </View>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 10,
  },
  card: {
    minHeight: 64,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    elevation: 2,
    padding: 16,
  },
  content: {
    flexDirection: "row",
    gap: 12,
    textAlign: "left",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.darkBlue,
    flex: 1,
  },
  subtitle: {
    fontSize: 12,
    color: "#666",
    flex: 1,
  },
  user: {
    fontSize: 12,
    color: colors.darkBlue,
  },
});
