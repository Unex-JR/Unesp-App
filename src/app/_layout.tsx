import { db } from "@/db";
import migrations from "@/db/migrations/migrations";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { Stack } from "expo-router";
import { useEffect } from "react";
import { Text, View } from "react-native";

export default function RootLayout() {
  const { success, error } = useMigrations(db, migrations);

  useEffect(() => {
    if (error) {
      console.error("--- Migration Error ---");
      console.error("Message:", error.message);
      console.error("Stack:", error.stack);
      console.error("Full error object:", JSON.stringify(error, null, 2));
    }
  }, [error]);

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
        <Text style={{ color: "red", fontSize: 14 }}>
          Erro na migration: {error.message}
        </Text>
        <Text style={{ color: "gray", fontSize: 12, marginTop: 10 }}>
          Veja o console (metro logs) para o erro completo
        </Text>
      </View>
    );
  }
  if (!success) {
    return <Text>Aplicando migrations...</Text>;
  }

  return <Stack />;
}
