import { useAuth } from "@/features/auth/useAuth";
import { colors } from "@/theme/colors";
import { Pressable, StyleSheet, Text, View } from "react-native";
//icon google

export default function LoginScreen() {
  const { signIn } = useAuth();

  return (
    <View style={styles.container}>
      <Pressable style={styles.button} onPress={signIn}>
        <Text style={styles.buttonTitle}>Continuar com Google</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  button: {
    width: "100%",
    height: 50,
    overflow: "hidden",
    backgroundColor: "rgb(62, 130, 232, 0.2)",

    justifyContent: "center",
    alignItems: "center",

    borderWidth: 1,
    borderColor: colors.primaryBlue,
    borderRadius: 24,
  },
  buttonTitle: {
    fontSize: 16,
    color: colors.text,
  },
});
