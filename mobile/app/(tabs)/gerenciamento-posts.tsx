import CreateButton from "@/src/components/ActionButtons/CreateButton";
import PostsManagementList from "@/src/components/PostsManagementList/PostsManagementList";
import { colors } from "@/src/theme/colors";
import globalStyles from "@/src/theme/styles";
import { Link, useNavigation } from "expo-router";
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function gerenciamento() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ title: "Gerenciamento de Posts" });
  });

  return (
    <SafeAreaView style={globalStyles.container}>
      <View>
        <Text style={globalStyles.mainTitle}>Gerenciamento de Posts</Text>
      </View>
      <View>
        <Link
          asChild
          href="/post/criar/"
        >
          <CreateButton label="Criar Post" />
        </Link>
      </View>
      <PostsManagementList />
    </SafeAreaView>
  );
}
