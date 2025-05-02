import { Stack } from "expo-router";
import Toast from "react-native-toast-message";

export default function PostsLayout() {
  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
      <Toast />
    </>
  );
}
