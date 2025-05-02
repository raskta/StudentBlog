import PostsManagementList from "@/src/components/PostsManagementList/PostsManagementList";
import { colors } from "@/src/theme/colors";
import globalStyles from "@/src/theme/styles";
import { useNavigation } from "expo-router";
import { useEffect } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function gerenciamento() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ title: "Gerenciamento de Posts" });
  });

  const handleCriarPostPress = () => {};

  return (
    <View style={globalStyles.container}>
      <View>
        <Text style={globalStyles.mainTitle}>Gerenciamento de Posts</Text>
        <Pressable
          onPress={handleCriarPostPress}
          style={({ pressed }) => [styles.pressable, pressed && styles.pressed]}
        >
          <Text style={styles.text}>Criar post</Text>
        </Pressable>
      </View>
      <PostsManagementList />
    </View>
  );
}

const styles = StyleSheet.create({
  pressable: {
    marginTop: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 9999,
    backgroundColor: colors.lightMainBlue,
    alignSelf: "flex-start",

    // Sombra iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,

    // Sombra Android
    elevation: 2,
  },
  pressed: {
    opacity: 0.8,
  },
  text: {
    fontWeight: "600",
  },
});
