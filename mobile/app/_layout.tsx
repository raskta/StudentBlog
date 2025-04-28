import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "react-native";
import formatTabName from "@/src/utils/formatTabName";

const icons: Record<string, string> = {
  settings: "settings-outline",
  profile: "person-outline",
};

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          if (route.name === "index") {
            return (
              <Image
                source={require("@/src/assets/images/logo.png")}
                style={{ width: size, height: size }}
                resizeMode="contain"
              />
            );
          }

          const iconName = icons[route.name] || "ellipse-outline";
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarLabel: formatTabName(route.name),
      })}
    />
  );
}
