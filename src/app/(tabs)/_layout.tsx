import { Tabs } from 'expo-router';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Home, Calendar, FileText, Grid2x2, Target } from 'lucide-react-native';
import { colors } from '@/theme/colors';

export default function TabsLayout() {

    const insets = useSafeAreaInsets();

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: colors.primaryBlue,
                tabBarInactiveTintColor: colors.textTertiary,
                tabBarStyle: {
                    backgroundColor: colors.white,
                    borderTopColor: colors.border,
                    height: 60 + insets.bottom,
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Início',
                    tabBarIcon: ({ color }) => <Home size={22} color={color} />,
                }}
            />
            <Tabs.Screen
                name="horarios"
                options={{
                    title: 'Horários',
                    tabBarIcon: ({ color }) => <Calendar size={22} color={color} />,
                }}
            />
            <Tabs.Screen
                name="avaliacoes"
                options={{
                    title: 'Avaliações',
                    tabBarIcon: ({ color }) => <FileText size={22} color={color} />,
                }}
            />
            <Tabs.Screen
                name="foco"
                options={{
                    title: 'Foco',
                    tabBarIcon: ({ color }) => <Target size={22} color={color} />,
                }}
            />
            <Tabs.Screen
                name="atalhos"
                options={{
                    title: 'Atalhos',
                    tabBarIcon: ({ color }) => <Grid2x2 size={22} color={color} />,
                }}
            />
        </Tabs>
    );
}