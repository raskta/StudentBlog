import TeachersList from "@/src/components/TeachersList/TeachersList";
import globalStyles from "@/src/theme/styles";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

export default function GerenciamentoProfessores() {
  return (
    <SafeAreaView style={globalStyles.container}>
      <Text style={globalStyles.mainTitle}>Gerenciamento de Professores</Text>
      <View style={styles.list}>
        <TeachersList />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  list: {
    marginTop: 16,
  },
});
