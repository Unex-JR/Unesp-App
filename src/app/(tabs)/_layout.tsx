import { Tabs } from 'expo-router';
import { View } from 'react-native';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Home, Calendar, ListSortDescending, Grid2x2, Target } from 'lucide-react-native';
import { colors } from '@/theme/colors';

function TabIcon({ focused, children }: { focused: boolean; children: React.ReactNode }) {
    return (
        <View
            style={{
                alignItems: 'center',
                backgroundColor: focused ? `${colors.primaryBlue}1A` : 'transparent',
                borderRadius: 16,
                justifyContent: 'center',
                minHeight: 32,
                minWidth: 40,
                top: 4,
            }}
        >
            {children}
        </View>
    );
}

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
                    height: 65 + insets.bottom,
                },
                tabBarLabelStyle: {
                    top: 6,
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Início',
                    tabBarIcon: ({ color, focused }) => <TabIcon focused={focused}><Home size={22} color={color} /></TabIcon>,
                }}
            />
            <Tabs.Screen
                name="horarios"
                options={{
                    title: 'Horários',
                    tabBarIcon: ({ color, focused }) => <TabIcon focused={focused}><Calendar size={22} color={color} /></TabIcon>,
                }}
            />
            <Tabs.Screen
                name="avaliacoes"
                options={{
                    title: 'Avaliações',
                    tabBarIcon: ({ color, focused }) => <TabIcon focused={focused}><ListSortDescending size={22} color={color} /></TabIcon>,
                }}
            />
            <Tabs.Screen
                name="foco"
                options={{
                    title: 'Foco',
                    tabBarIcon: ({ color, focused }) => <TabIcon focused={focused}><Target size={22} color={color} /></TabIcon>,
                }}
            />
            <Tabs.Screen
                name="atalhos"
                options={{
                    title: 'Atalhos',
                    tabBarIcon: ({ color, focused }) => <TabIcon focused={focused}><Grid2x2 size={22} color={color} /></TabIcon>,
                }}
            />
        </Tabs>
    );
}