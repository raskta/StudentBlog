import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

type TabConfig = {
  name: string;
  title: string;
  icon: React.ComponentProps<typeof Ionicons>["name"];
  isProtected?: boolean;
};

const tabs: TabConfig[] = [
  {
    name: "index",
    title: "Home",
    icon: "home-outline",
  },
];

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#2563eb",
        tabBarInactiveTintColor: "#64748b",
      }}
    >
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
            tabBarStyle: tab.isProtected ? { display: "none" } : undefined,
          }}
        />
      ))}
    </Tabs>
  );
}
