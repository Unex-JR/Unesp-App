import { View, Text, StyleSheet } from 'react-native'
import { ChevronDown } from 'lucide-react-native'
import { colors } from '@/theme'
import { typography } from '@/theme';
import { useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import { DisciplineItem } from '@/components/DisciplineItem';
import { DisciplineDetails, DisciplineDetailsModal } from '@/components/DisciplineDetailsModal';


export default function Disciplinas() {

    const insets = useSafeAreaInsets();
    const [selectedDiscipline, setSelectedDiscipline] = useState<DisciplineDetails | null>(null);

    const disciplines: DisciplineDetails[] = [
        { id: 'data-structures', name: 'Estrutura de Dados', code: 'CC2666', professor: 'Prof. Wallace', local: 'Sala 3A', frequency: 85 },
        { id: 'object-oriented-programming', name: 'Programação Orientada a Objetos', code: 'CC2666', professor: 'Prof. Freire', local: 'Sala 11C', frequency: 92 },
        { id: 'calculus-3', name: 'Cálculo 3', code: 'CC2666', professor: 'Prof. Waldemar', local: 'Sala 3A', frequency: 78 },
        { id: 'linear-algebra', name: 'Álgebra Linear', code: 'CC2666', professor: 'Prof. Weber', local: 'Sala 11C', frequency: 88 },
        { id: 'calculus-3-2', name: 'Cálculo 3', code: 'CC2666', professor: 'Prof. Waldemar', local: 'Sala 3A', frequency: 78 },
        { id: 'linear-algebra-2', name: 'Álgebra Linear', code: 'CC2666', professor: 'Prof. Ribas', local: 'Sala 11C', frequency: 70 },
    ];

    return (
        <View
            style={[
                styles.container,
                { paddingTop: 16 + insets.top, paddingBottom: 16 + insets.bottom },
            ]}
        >

            <Text style={styles.title}>
                    Disciplinas
            </Text>

            {/* Filtros */}
            {/* Provavelmente tirar, pois não teremos conexão com o sisgrad */}
            <View style={styles.disciplineFilter}>
                <View style={styles.filterItem}>
                    <Text style={styles.filterItemText}>
                        2026
                    </Text>
                    <ChevronDown size={16} />
                </View>
                <View style={styles.filterItem}>
                    <Text style={styles.filterItemText}>
                        2º semestre
                    </Text>
                    <ChevronDown size={16} />
                </View>
            </View>

            {/* Todos os cards das disciplinas 
                - confirmar quais informações serão exibidas no card
            */}
            <ScrollView
                style={styles.disciplineScroll}
                contentContainerStyle={styles.disciplineScrollContent}
            >
                <View style={styles.disciplineGrid}>
                    {disciplines.map((discipline) => (
                        <DisciplineItem
                            key={discipline.id}
                            title={discipline.name}
                            local={discipline.local}
                            professor={discipline.professor}
                            frequency={discipline.frequency}
                            code={discipline.code}
                            onPress={() => setSelectedDiscipline(discipline)}
                        />
                    ))}
                </View>
            </ScrollView>

            <DisciplineDetailsModal
                discipline={selectedDiscipline}
                visible={selectedDiscipline !== null}
                onClose={() => setSelectedDiscipline(null)}
            />
                
        </View>
    )
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
    disciplineFilter: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginVertical: 8,
        gap: 6,
        alignContent: 'center',
    },
    disciplineGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        rowGap: 4,
    },
    disciplineScroll: {
        flex: 1,
    },
    disciplineScrollContent: {
        paddingBottom: 16,
    },
    filterItem: {
        paddingVertical: 6,
        paddingHorizontal: 16,
        borderRadius: 20,
        backgroundColor: colors.white,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 4,
    },
    filterItemText: {
        fontFamily: typography.fontFamily.semibold,
        fontSize: typography.fontSize.xs,
        color: colors.text,
    },
})