import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { colors, typography } from '@/theme';
import { useSafeAreaInsets } from "react-native-safe-area-context";

// verificar se teremos essa pagina de atalhos ou coloca tudo na home

export default function Atalhos() {

    const insets = useSafeAreaInsets();

    return (
        <ScrollView style={styles.container} contentContainerStyle={{paddingTop: insets.top, paddingBottom: insets.bottom}}>

            <View>
                <Text style={styles.title}>Atalhos</Text>
            </View>
            
            <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false} 
                contentContainerStyle={styles.filtersContainer}
            >
                
            </ScrollView>

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.backgroundPage,
        padding: 16,
        borderRadius: 8,
    },
    title: {
        fontFamily: typography.fontFamily.extrabold,
        fontSize: typography.fontSize['2xl'],
        color: colors.text,
    },
    subtitle: {
        fontFamily: typography.fontFamily.regular,
        fontSize: typography.fontSize.base,
        color: colors.textSecondary,
    },
    sectionTitle: {
        fontFamily: typography.fontFamily.light,
        fontSize: typography.fontSize.xs,
        color: colors.text,
        marginBottom: 8,
    },
    header: {
        marginBottom: 16,
    },
    filtersContainer: {
        flexDirection: 'row',
        gap: 8,
        paddingVertical: 12, 
    }
});