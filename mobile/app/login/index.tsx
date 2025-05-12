import { useState } from "react";
import { SafeAreaView, Text, View, TextInput, TouchableOpacity } from "react-native";
import styles from "./styles";
import globalStyles from "@/src/theme/styles";
import { useAuth } from "@/src/stores/auth-store";
import Toast from "react-native-toast-message";
import { useRouter } from "expo-router";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const setToken = useAuth((state) => state.setToken);
  const router = useRouter();

  const validateEmail = (email: string) => {
    const regex = /^\S+@\S+\.\S+$/;
    return regex.test(email);
  };

  const handleLogin = () => {
    if (!email || !password) {
      return Toast.show({ type: "error", text1: "Preencha todos os campos" });
    }

    if (!validateEmail(email)) {
      return Toast.show({ type: "error", text1: "Preencha todos os campos" });
    }

    const fakeToken = "123456abcdef";
    setToken(fakeToken);
    Toast.show({ type: "success", text1: "Login realizado com sucesso" });

    router.navigate("/");
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
    </SafeAreaView>
  );
};

export default LoginScreen;
