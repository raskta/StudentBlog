import { useLocalSearchParams } from "expo-router";
import { View, Text } from "react-native";

export default function PostDetails() {
  const { id } = useLocalSearchParams();

  return <View></View>;
}
