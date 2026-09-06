/*

Anotações (vitor): 
- Ainda preciso adicionar tratamento de exceções e erros (dependo da comunição do backend com DB);
- preciso implementar a lógica para atualizar o status das tarefas e aulas.
- Analisar dps se cé possível melhorar os componentes e se faltam informações

*/


import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { colors, typography } from '@/theme';
import { TaskItem} from '@/components/TaskItem';
import { NextClassCard } from '@/components/NextClassCard';
import { AttendanceRow } from '@/components/AttendanceRow';

import { User2 } from 'lucide-react-native';

import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Home() {

    const insets = useSafeAreaInsets();

    return (
        <ScrollView style={styles.container} contentContainerStyle={{paddingTop: insets.top, paddingBottom: insets.bottom}}>


            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16}}>
                <View>
                    <Text style={styles.title}>Bom dia, Vitor!</Text>
                    <Text style={styles.subtitle}>Sábado, 5 de Setembro</Text>
                </View>

                <View style={{backgroundColor: colors.tertiaryBlue, padding: 6, borderRadius: 30}}>
                    <User2 size={24} color= '#a1b1f1' />
                </View>
            
            </View>

            <NextClassCard minutes={30} title="Aula de Física" subject="Lab 3 - Bloco D" start="08:00" end="09:30"></NextClassCard>

            <View>
                <Text style={styles.sectionTitle}>Próximas tarefas</Text>
                <TaskItem title="Trabalho de ATP" subject="ATP" deadline="Hoje 23:59" />
                <TaskItem title="Trabalho de ATP" subject="ATP" deadline="Hoje 23:59" />
                <TaskItem title="Trabalho de ATP" subject="ATP" deadline="Hoje 23:59" />
            </View>
            

            <View style={{flexDirection: 'column', backgroundColor: colors.white, padding: 12, borderRadius: 12, marginTop: 8, marginBottom: 8, boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.05)',  }}>
                <Text style={styles.sectionTitle}>Frequência</Text>
                <AttendanceRow discipline="Álgebra Linear" absences={10} totalAbsences={18}></AttendanceRow>
                <AttendanceRow discipline="Física I" absences={19} totalAbsences={18}></AttendanceRow>
                <AttendanceRow discipline="Linguagens de Programação" absences={8} totalAbsences={18}></AttendanceRow>
            </View>
            

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
        fontFamily: typography.fontFamily.bold,
        fontSize: typography.fontSize.sm,
        color: colors.text,
        marginBottom: 8,
    },
});