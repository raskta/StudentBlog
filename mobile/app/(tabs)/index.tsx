import { Image, Text, View } from "react-native";
import PostList from "@/src/components/PostList/PostList";
import globalStyles from "../../src/theme/styles";
import SearchBar from "@/src/components/SearchBar/SearchBar";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
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
      <SearchBar />

      {/* Posts */}
      <PostList />
    </SafeAreaView>
  );
}
