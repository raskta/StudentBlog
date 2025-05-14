import TeachersList from "@/src/components/TeachersList/TeachersList";
import globalStyles from "@/src/theme/styles";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

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
