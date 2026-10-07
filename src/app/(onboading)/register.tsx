import { useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { useAuth } from "@/features/auth/useAuth";
import { completeProfile } from "@/services/onboarding.service";

export default function RegisterScreen() {
  const { user } = useAuth();

  const [name, setName] = useState("");
  const [currentSemester, setCurrentSemester] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit() {
    if (!user?.email) {
      setErrorMessage(
        "Não conseguimos obter seu email do Google. Tente entrar novamente.",
      );
      return;
    }

    const parsedSemester = Number(currentSemester);

    if (
      !name.trim() ||
      !currentSemester.trim() ||
      Number.isNaN(parsedSemester)
    ) {
      setErrorMessage("Preencha nome e semestre corretamente.");
      return;
    }

    setSubmitting(true);
    setErrorMessage(null);

    try {
      await completeProfile({
        name: name.trim(),
        email: user.email,
        currentSemester: parsedSemester,
      });

      /**
       *  Não usamos expo-router aqui, o componente
       *  Stack.Protected do _layout reage a chamada e redireciona usuário
       *  quando a linha aparece no banco (useLiveQuery).
       */
    } catch (error) {
      setErrorMessage("Não foi possível salvar seu perfil. Tente novamente.");
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Complete seu perfil</Text>
        <Text style={styles.subtitle}>
          Só mais um passo antes de começar
          {user?.givenName ? `, ${user.givenName}` : ""}.
        </Text>
      </View>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Nome completo"
          value={name}
          onChangeText={setName}
          autoCapitalize="words"
        />
        <TextInput
          style={styles.input}
          placeholder="Semestre atual"
          value={currentSemester}
          onChangeText={setCurrentSemester}
          keyboardType="number-pad"
        />
      </View>

      {errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : null}

      <Pressable
        style={[styles.submitButton, submitting && styles.submitButtonDisabled]}
        onPress={handleSubmit}
        disabled={submitting}
      >
        {submitting ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.submitButtonText}>Concluir cadastro</Text>
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: "center" },
  header: { marginBottom: 32 },
  title: { fontSize: 24, fontFamily: "Inter_700Bold" },
  subtitle: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    color: "#666",
    marginTop: 4,
  },
  form: { gap: 12 },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontFamily: "Inter_400Regular",
  },
  errorText: {
    color: "#c0392b",
    fontFamily: "Inter_400Regular",
    marginTop: 12,
  },
  submitButton: {
    marginTop: 24,
    backgroundColor: "#111",
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
  },
  submitButtonDisabled: { opacity: 0.6 },
  submitButtonText: { color: "#fff", fontFamily: "Inter_600SemiBold" },
});
