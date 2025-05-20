import { useAuthStore } from "@/src/stores/auth-store";
import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

export default function AppLayout() {
  const loadTokenFromStorage = useAuthStore((s) => s.loadTokenFromStorage);
  const token = useAuthStore((s) => s.token);
  const [ready, setReady] = useState(false);
  const segments = useSegments();
  const router = useRouter();
  const loggedUser = useAuthStore((s) => s.loggedUser);

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
