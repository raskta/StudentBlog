import { useAuth } from "@/src/stores/auth-store";
import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";

export default function PostsLayout() {
  const { token, loadTokenFromStorage } = useAuth();
  const [ready, setReady] = useState(false);
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    loadTokenFromStorage().finally(() => setReady(true));
  }, []);

  useEffect(() => {
    if (!ready) return;

    const currentSegment = segments[0];

    const publicSegments = ["(tabs)/index", "(tabs)/login.tsx"];

    const isPublic = publicSegments.includes(currentSegment);

    if (!token && !isPublic) {
      router.replace("/login");
    }
  }, [segments, token, ready]);

  if (!ready) return null;

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
