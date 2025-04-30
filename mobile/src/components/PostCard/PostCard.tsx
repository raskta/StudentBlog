import { Text, View, Pressable, StyleSheet } from "react-native";
import { Link } from "expo-router";
import { Post } from "../../../../shared/interfaces/post";
import { colors } from "@/src/theme/colors";
import { Feather } from "@expo/vector-icons";

type PostCardProps = Partial<Post> & {
  editable?: boolean;
  onEdit?: (id: number) => void;
};

export default function PostCard({
  titulo,
  id,
  subtitulo,
  usuario,
  editable = false,
  onEdit,
}: PostCardProps) {
  return (
    <Link href={`/post/${id}`} style={styles.cardLink} asChild>
      <Pressable
        style={({ pressed }) => [
          styles.cardContainer,
          editable && styles.cardContainerEditable,
          {
            backgroundColor: pressed ? "#f0f0f0" : "#ffffff",
          },
        ]}
      >
        <View
          style={[
            styles.card,
            editable && {
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 0,
            },
          ]}
        >
          <View style={editable && styles.cardEditable}>
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
          {editable && (
            <View style={styles.actions}>
              <Pressable
                onPress={() => onEdit && onEdit(id!)}
                style={({ pressed }) => [
                  styles.actionBtn,
                  styles.editBtn,
                  pressed && { opacity: 0.6 },
                ]}
              >
                <Feather name="edit-2" size={18} color="#2563eb" />
              </Pressable>

              <Pressable
                onPress={() => onDelete?.(id)}
                style={({ pressed }) => [
                  styles.actionBtn,
                  styles.deleteBtn,
                  pressed && { opacity: 0.6 },
                ]}
              >
                <Feather name="trash-2" size={18} color="#dc2626" />
              </Pressable>
            </View>
          )}
        </View>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  cardLink: {
    flex: 1,
    maxWidth: 540,
    width: "100%",
  },
  cardContainer: {
    borderRadius: 10,
    width: "100%",
  },
  cardContainerEditable: {
    maxWidth: "100%",
  },
  card: {
    minHeight: 64,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    elevation: 2,
    padding: 16,
  },
  cardEditable: {
    flex: 5,
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
  actions: {
    flexDirection: "row",
    height: "100%",
    alignItems: "stretch",
    flex: 2,
  },
  actionBtn: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    flex: 1,
  },
  editBtn: {
    backgroundColor: "#bfdbfe",
  },
  deleteBtn: {
    backgroundColor: "#fecaca",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
});
