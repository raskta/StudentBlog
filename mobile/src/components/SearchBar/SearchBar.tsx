import {
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import { usePostsStore } from "@/src/stores/posts-store";

export default function SearchBar() {
  const setSearchTerm = usePostsStore((s) => s.setSearchTerm);
  const searchTerm = usePostsStore((s) => s.searchTerm);

  const [isFocused, setIsFocused] = useState(false);

  const containerStyles = [
    styles.searchContainer,
    isFocused && styles.searchContainerFocused,
    !!searchTerm && styles.searchContainerFilled,
  ];

  return (
    <View style={containerStyles}>
      <TextInput
        placeholder="Buscar postagens..."
        value={searchTerm}
        onChangeText={setSearchTerm}
        style={styles.textInput}
        clearButtonMode="never"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      {searchTerm.length > 0 && (
        <TouchableOpacity onPress={() => setSearchTerm("")}>
          <Text style={styles.clearButton}>×</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    marginTop: 32,
    borderWidth: 1,
    borderColor: "#a1a1aa",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    opacity: 0.8,
  },

  searchContainerFocused: {
    borderColor: "#3b82f6",
    opacity: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },

  searchContainerFilled: {
    borderColor: "#10b981",
  },
  textInput: {
    flex: 1,
    paddingVertical: 8,
  },
  clearButton: {
    fontSize: 18,
    color: "#6b7280",
    paddingHorizontal: 8,
  },
});
