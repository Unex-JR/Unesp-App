import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { colors, typography } from '@/theme';
import { TaskItem } from '@/components/TaskItem';
import { useState } from 'react';
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Avaliacoes() {

    const insets = useSafeAreaInsets();

    const [selectedFilter, setSelectedFilter] = useState('Todas');
    const filters = ['Todas', 'Pendentes', 'Atrasadas', 'Concluídas', 'Filtrar por disciplina'];

    return (
        <ScrollView style={styles.container} contentContainerStyle={{paddingTop: insets.top, paddingBottom: insets.bottom}}>

            <View>
                <Text style={styles.title}>Avaliações e Trabalhos</Text>
            </View>
            
            {/* ScrollView rolável horizontalmente */}
            <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false} 
                contentContainerStyle={styles.filtersContainer}
            >
                {filters.map((filter) => (
                    <TouchableOpacity 
                        key={filter}
                        onPress={() => setSelectedFilter(filter)}
                        style={[
                            styles.chip,
                            selectedFilter === filter && styles.activeChip // aplica o fundo azul se estiver selecionado
                        ]}
                    >
                        <Text style={[
                            styles.chipText,
                            selectedFilter === filter && styles.activeChipText // aplica texto branco se estiver selecionado
                        ]}>
                            {filter}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            <TaskItem title="Seminário" subject="Organização de Computadores" deadline="Hoje 23:59" />
            <TaskItem title="Seminário" subject="Organização de Computadores" deadline="Hoje 23:59" />
            <TaskItem title="Seminário" subject="Organização de Computadores" deadline="Hoje 23:59" />


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
    },
    chip: {
        paddingVertical: 6,
        paddingHorizontal: 16,
        borderRadius: 20,
        backgroundColor: colors.white,
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    activeChip: {
        backgroundColor: colors.primaryBlue || '#3B82F6', // Cor azul de quando está ativo
        borderColor: colors.primaryBlue || '#3B82F6',
    },
    chipText: {
        fontFamily: typography.fontFamily.semibold,
        fontSize: typography.fontSize.xs,
        color: colors.textSecondary,
    },
    activeChipText: {
        color: colors.white,
    },
});