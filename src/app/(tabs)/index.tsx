import { View, Text, StyleSheet } from 'react-native';
import { colors, typography } from '@/theme';

export default function Home() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bom dia, usuário!</Text>
            <Text style={styles.subtitle}>Sábado, 5 de Setembro</Text>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.backgroundPage,
        borderRadius: 8,
    },
    title: {
        fontFamily: typography.fontFamily.bold,
        fontSize: typography.fontSize['2xl'],
        color: colors.text,
    },
    subtitle: {
        fontFamily: typography.fontFamily.regular,
        fontSize: typography.fontSize.base,
        color: colors.textSecondary,
    }
});