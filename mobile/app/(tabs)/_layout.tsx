import { Tabs, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Pressable } from "react-native";
import { useAuth } from "@/src/stores/auth-store";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

type TabConfig = {
  name: string;
  title: string;
  icon: React.ComponentProps<typeof Ionicons>["name"];
};

const tabs: TabConfig[] = [{ name: "index", title: "Home", icon: "home-outline" }];

export default function TabsLayout() {
  const { logout } = useAuth();
  const token = useAuth((s) => s.token);

  const handleAuthAction = async () => {
    if (token) {
      await logout();
      router.replace("/login");
    } else {
      router.push("/login");
    }
  };

  return (
    <SafeAreaProvider>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "#2563eb",
          tabBarInactiveTintColor: "#64748b",
          tabBarStyle: {
            height: 60,
            paddingBottom: 10,
          },
        }}
      >
        {/* Outras abas */}
        {tabs.map((tab) => (
          <Tabs.Screen
            key={tab.name}
            name={tab.name}
            options={{
              title: tab.title,
              tabBarIcon: ({ color, focused }) => (
                <Ionicons
                  name={focused ? tab.icon.replace("-outline", "") : tab.icon}
                  size={24}
                  color={color}
                />
              ),
            }}
          />
        ))}

        {/* Última aba como botão de login/logout */}
        <Tabs.Screen
          name="auth-tab"
          options={{
            title: token ? "Sair" : "Entrar",
            tabBarIcon: ({ color }) => (
              <Ionicons
                name={token ? "exit-outline" : "log-in-outline"}
                size={22}
                color={color}
                style={{ opacity: 0.7 }}
              />
            ),
            tabBarButton: (props) => (
              <Pressable
                {...props}
                onPress={handleAuthAction}
                style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1, alignItems: "center" }]}
              />
            ),
          }}
        />
      </Tabs>
    </SafeAreaProvider>
  );
}
