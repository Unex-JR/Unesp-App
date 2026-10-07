// app/_layout.tsx
import { db } from "@/db";
import migrations from "@/db/migrations/migrations";
import { AuthProvider } from "@/features/auth/AuthProvider";
import { useAuth } from "@/features/auth/useAuth";
import { useOnBoardingStatus } from "@/features/onboarding/useOnBoardingStatus";
import {
  Inter_100Thin,
  Inter_200ExtraLight,
  Inter_300Light,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  useFonts,
} from "@expo-google-fonts/inter";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

SplashScreen.preventAutoHideAsync();

/**
 * Único ponto que decide qual grupo de rotas fica visível.
 * Precisa estar dentro do AuthProvider — depende de useAuth().
 */
function RootNavigator() {
  const { user, loading: authLoading } = useAuth();
  const { hasCompleteOnBoarding, loading: onBoardingLoading } =
    useOnBoardingStatus(user);

  if (authLoading || (user && onBoardingLoading)) {
    return null; // Adicionar tela/componente de splash
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* 
      
      Comentei essa parte porque está dando erro na autorização do google

      <Stack.Protected guard={!user}>
        <Stack.Screen name="(auth)/login" />
      </Stack.Protected>

      <Stack.Protected guard={!!user && !hasCompleteOnBoarding}>
        <Stack.Screen name="(onboarding)/register" />
      </Stack.Protected>
      
      */}

      <Stack.Screen name="(tabs)" />
      {/*<Stack.Protected guard={!!user && hasCompleteOnBoarding}>
        
      </Stack.Protected>*/}
    </Stack>
  );
}

export default function RootLayout() {
  const { success, error } = useMigrations(db, migrations);
  const [fontsLoaded, fontError] = useFonts({
    Inter_100Thin,
    Inter_200ExtraLight,
    Inter_300Light,
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) SplashScreen.hideAsync();
  }, [fontsLoaded, fontError]);

  useEffect(() => {
    if (error) console.error("Migration error:", error.message);
  }, [error]);

  if (!fontsLoaded && !fontError) return null;

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
        <Text style={{ color: "red", fontSize: 14 }}>
          Erro na migration: {error.message}
        </Text>
      </View>
    );
  }

  if (!success) return <Text>Aplicando migrations...</Text>;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <RootNavigator />
      </AuthProvider>
    </GestureHandlerRootView>
  );
}
