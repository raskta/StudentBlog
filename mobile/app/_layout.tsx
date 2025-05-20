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

    // Define public routes
    const publicRoutes = ["(tabs)"];
    const protectedRoutes = ["(tabs)/gerenciamento-posts", "(tabs)/gerenciamento-usuarios", "post/criar", "post/editar", "user/criar", "user/editar"];

    // Check if current route is protected
    const isProtected = protectedRoutes.some((route) => segments.join("/").includes(route));
    const isPublic = publicRoutes.includes(currentSegment);

    if (!token && isProtected) {
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