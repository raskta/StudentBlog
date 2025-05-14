import { useAuth } from "@/src/stores/auth-store";
import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

export default function PostsLayout() {
  const { loadTokenFromStorage } = useAuth();
  const token = useAuth((s) => s.token);
  const [ready, setReady] = useState(false);
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    loadTokenFromStorage().finally(() => setReady(true));
  }, []);

  useEffect(() => {
    if (!ready) return;

    const currentSegment = segments[0];

    const publicSegments = ["(tabs)/", "(tabs)/login"];

    const isPublic = publicSegments.includes(currentSegment);

    if (!token && !isPublic) {
      router.replace("/login");
    }
  }, [segments, token, ready]);

  if (!ready) return null;

  return (
    <SafeAreaProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
      <Toast />
    </SafeAreaProvider>
  );
}
