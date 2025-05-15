import React, { useState } from "react";
import { Text, View, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";
import { useAuth } from "@/src/hooks/useAuth";
import { ApiRequestError } from "../../../shared/interfaces/error";

import styles from "./styles";
import globalStyles from "@/src/theme/styles";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { login } = useAuth();

  const handleLogin = async () => {
    if (!email.trim() || !password) {
      Toast.show({
        type: "error",
        text1: "Campos incompletos",
        text2: "Preencha email e senha para continuar",
      });
      return;
    }

    try {
      const ok = await login({ email, password });
      if (ok) {
        Toast.show({ type: "success", text1: "Login realizado com sucesso" });
        router.replace("/");
      }
    } catch (error: unknown) {
      let message = "Ocorreu um erro inesperado";

      if (error instanceof Error) {
        message = error.message;
      } else if ((error as ApiRequestError).message !== undefined) {
        message = (error as ApiRequestError).message;
      }

      console.error("Erro no login:", message);
      Toast.show({
        type: "error",
        text1: "Erro no login",
        text2: message,
      });
    }
  };

  return (
    <SafeAreaView style={styles.loginContainer}>
      <View>
        <Text style={globalStyles.mainTitle}>Login</Text>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.label}>Senha</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite sua senha"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleLogin}
        >
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
      </View>

      <Toast />
    </SafeAreaView>
  );
}
