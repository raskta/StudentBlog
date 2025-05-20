import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  form: {
    gap: 16,
    paddingVertical: 24,
  },
  previewContainer: {
    marginTop: 8,
    alignItems: "center",
  },
  previewImage: {
    width: 200,
    height: 200,
    marginTop: 8,
    borderRadius: 8,
  },
  noImageText: {
    color: "#666",
    textAlign: "center",
    marginTop: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  imageButton: {
    backgroundColor: "#60a5fa",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
});
