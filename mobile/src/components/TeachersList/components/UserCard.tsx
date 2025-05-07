import { StyleSheet, Text, View } from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { User } from "../../../../../shared/interfaces/user";
import EditButton from "../../ActionButtons/EditButton";
import DeleteButton from "../../ActionButtons/DeleteButton";

type UserCardProps = Partial<User> & {
  onEdit?: () => void;
  onDelete?: () => void;
};

const UserCard: React.FC<UserCardProps> = ({ nome, id, ativo, email, role, onEdit, onDelete }) => (
  <View style={styles.userCard}>
    <View style={styles.userCardContent}>
      <View style={styles.cardHeader}>
        <View style={styles.userRoleContainer}>
          {role === "Professor" ? (
            <View>
              <FontAwesome5
                name="chalkboard-teacher"
                size={18}
                color="#27272a"
              />
            </View>
          ) : (
            <FontAwesome5
              name="user-alt"
              size={18}
              color="#27272a"
            />
          )}
          <Text style={styles.userRoleText}>{role === "Professor" ? "Prof." : "Aluno"}</Text>
        </View>
        <Text
          style={styles.username}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {nome}
        </Text>
        <View
          style={[
            styles.userStatusContainer,
            ativo ? styles.userStatusActiveContainer : styles.userStatusInactiveContainer,
          ]}
        >
          <Text style={styles.userStatus}>{ativo ? "Ativo" : "Inativo"}</Text>
        </View>
      </View>
      <View style={styles.cardBody}>
        <Text style={styles.userEmail}>{email}</Text>
      </View>
    </View>
    <View style={styles.actions}>
      {onEdit && id && (
        <EditButton
          id={id.toString()}
          onEdit={onEdit}
        />
      )}
      {onDelete && id && nome && (
        <DeleteButton
          id={id.toString()}
          titulo={nome}
          onDelete={onDelete}
        />
      )}
    </View>
  </View>
);

export default UserCard;

const styles = StyleSheet.create({
  userCard: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    borderRadius: 12,
    marginHorizontal: 4,
    flex: 1,
    justifyContent: "center",
    // Android
    elevation: 1,

    // iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1.0,
  },
  userCardContent: {
    padding: 16,
    flex: 1,
  },
  cardHeader: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  userRoleContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  userRoleText: {
    fontSize: 8,
  },
  username: {
    fontSize: 14,
    textAlignVertical: "center",
    maxWidth: 120,
    overflow: "hidden",
  },
  userStatusContainer: {
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 4,
    justifyContent: "center",
    marginVertical: "auto",
    alignSelf: "flex-start",
  },
  userStatusActiveContainer: {
    backgroundColor: "#22c55e",
  },
  userStatusInactiveContainer: {
    backgroundColor: "#fcd34d",
  },
  userStatus: {
    fontSize: 10,
  },

  cardBody: {
    paddingTop: 6,
  },
  userEmail: {
    fontSize: 12,
  },
  actions: {
    flexDirection: "row",
    height: "100%",
    alignItems: "stretch",
    flex: 2,
  },
});
