import Toast from "react-native-toast-message";
import { useAuthStore } from "@/src/stores/auth-store";
import { useUsersStore } from "@/src/stores/users-store";
import { useRouter } from "expo-router";

type Credentials = {
  email: string;
  password: string;
};

export function useAuth() {
  // Usa seletores individuais em vez de pegar o objeto todo
  const setToken = useAuthStore((s) => s.setToken);
  const setLoggedUser = useAuthStore((s) => s.setLoggedUser);
  const getUserByEmail = useUsersStore((s) => s.getUserByEmail);
  const router = useRouter();

  const validateEmail = (email: string) => /^\S+@\S+\.\S+$/.test(email);

  const login = async ({ email, password }: Credentials): Promise<boolean> => {
    try {
      // validacoes
      if (!email.trim() || !password) {
        Toast.show({ type: "error", text1: "Preencha todos os campos" });
        return false;
      }
      if (!validateEmail(email)) {
        Toast.show({ type: "error", text1: "Email em formato inválido" });
        return false;
      }

      // api
      console.log("[useAuth] Chamando /auth/login", { email });
      const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        console.warn("[useAuth] Falha no login API:", data);
        Toast.show({
          type: "error",
          text1: data.message || "Falha no login",
        });
        return false;
      }
      const { token } = data;

      // busca usuario para a store
      const userLogged = await getUserByEmail(email);
      if (!userLogged) {
        console.warn("[useAuth] getUserByEmail retornou null");
        Toast.show({ type: "error", text1: "Usuário não encontrado" });
        return false;
      }
      console.log("[useAuth] Usuário encontrado:", userLogged);

      await setToken(token);
      await setLoggedUser(userLogged);

      // redirect e feedback
      Toast.show({ type: "success", text1: "Login realizado com sucesso" });
      router.replace("/");
      return true;
    } catch (err) {
      console.error("[useAuth] Erro inesperado no login:", err);
      Toast.show({
        type: "error",
        text1: "Erro inesperado ao tentar logar",
      });
      return false;
    }
  };

  return { login };
}
