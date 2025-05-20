import { colors } from "@/src/theme/colors";
import { Pressable, StyleSheet, Text } from "react-native";

type CreateButtonProps = {
  label: string;
};

const CreateButton = ({ label, ...props }: CreateButtonProps) => {
  return (
    <Pressable
      {...props}
      style={({ pressed }) => [styles.pressable, pressed && styles.pressed]}
    >
      <Text style={styles.text}>{label}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  pressable: {
    marginVertical: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 9999,
    backgroundColor: colors.lightMainBlue,
    alignSelf: "flex-start",

    // Sombra iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,

    // Sombra Android
    elevation: 2,
  },
  pressed: {
    opacity: 0.8,
  },
  text: {
    fontWeight: "600",
  },
});

export default CreateButton;
