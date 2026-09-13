import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { colors, typography } from '@/theme';
import { TaskItem} from '@/components/TaskItem';
import { NextClassCarousel, NextClass } from '@/components/NextClassCarousel';
import { AttendanceRow } from '@/components/AttendanceRow';

import { MenuIcon, User2 } from 'lucide-react-native';

import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Image } from 'react-native';

export default function Home() {

    const insets = useSafeAreaInsets();

    // apenas para teste — virá do banco de dados
    const todayClasses: NextClass[] = [
        { id: 'c1', title: 'Aula de Física', subject: 'Lab 3 - Bloco D', start: '08:00', end: '09:30', minutes: 30 },
        { id: 'c2', title: 'Álgebra Linear', subject: 'Sala 204 - Bloco A', start: '10:00', end: '12:00', minutes: 150 },
        { id: 'c3', title: 'Programação Orientada a Objetos', subject: 'Lab 1 - Bloco C', start: '14:00', end: '16:00', minutes: 330 },
    ];

    return (
        <ScrollView style={styles.container} contentContainerStyle={{paddingTop: insets.top, paddingBottom: insets.bottom}}>

            <View style={[styles.horizontalContent, {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16}]}>
                <View>
                    <Text style={styles.title}>Bom dia, Vitor</Text>
                    <Text style={styles.subtitle}>Sábado, 5 de Setembro</Text>
                </View>

                <View style={{padding: 6, borderRadius: 30}}>
                    <User2 size={22} color='#999' />
                </View>
            
            </View>

            <NextClassCarousel classes={todayClasses} />

            <View style={styles.horizontalContent}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 6, marginBottom: 4}}>
                    <Text style={styles.sectionTitle}>Próximas tarefas</Text>
                    <Pressable
                        accessibilityRole="button"
                        accessibilityLabel="Ver todas as tarefas"
                        style={({ pressed }) => [styles.viewAllButton, pressed && styles.viewAllButtonPressed]}
                        onPress={() => {}}
                    >
                        <Text style={styles.viewAllText}>Ver todas</Text>
                    </Pressable>
                </View>
                
                <TaskItem title="Trabalho de ATP" subject="ATP" deadline="Hoje 23:59" />
                <TaskItem title="Avaliação 2" subject="Álgebra Linear" deadline="Hoje 23:59" />
                <TaskItem title="Trabalho de ATP" subject="ATP" deadline="Hoje 23:59" />
            </View>
            
            <View style={styles.horizontalContent}>
                <Text style={[styles.sectionTitle, { marginTop: 8 }]}>Frequências</Text>
                <View style={[styles.horizontalContent, {flexDirection: 'column', backgroundColor: colors.white, paddingVertical: 10, borderRadius: 14, marginTop: 8, marginBottom: 8, boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.05)', }]}>
                    <AttendanceRow discipline="Álgebra Linear" absences={10} totalAbsences={18}></AttendanceRow>
                    <AttendanceRow discipline="Física I" absences={19} totalAbsences={18}></AttendanceRow>
                    <AttendanceRow discipline="Linguagens de Programação" absences={8} totalAbsences={18}></AttendanceRow>
                    <AttendanceRow discipline="Álgebra Linear" absences={10} totalAbsences={18}></AttendanceRow>
                    <AttendanceRow discipline="Física I" absences={19} totalAbsences={18}></AttendanceRow>
                    <AttendanceRow discipline="Linguagens de Programação" absences={8} totalAbsences={18}></AttendanceRow>
                </View>
            </View>
            
            

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.backgroundPage,
        borderRadius: 8,
    },
    horizontalContent: {
        paddingHorizontal: 16,
    },
    title: {
        fontFamily: typography.fontFamily.extrabold,
        fontSize: typography.fontSize['2xl'],
        color: colors.text,
    },
    subtitle: {
        fontFamily: typography.fontFamily.regular,
        fontSize: typography.fontSize.sm,
        color: colors.textSecondary,
    },
    sectionTitle: {
        fontFamily: typography.fontFamily.bold,
        fontSize: typography.fontSize.sm,
        color: colors.text,
    },
    viewAllButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 2,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 30,
    },
    viewAllButtonPressed: {
        opacity: 0.75,
    },
    viewAllText: {
        fontFamily: typography.fontFamily.semibold,
        color: colors.primaryBlue,
        fontSize: typography.fontSize.xs,
    },
});