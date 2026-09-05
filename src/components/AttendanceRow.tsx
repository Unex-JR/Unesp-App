import { View, Text, StyleSheet } from 'react-native';
import { colors, typography } from '@/theme';

type AttendanceProps = {
    discipline: string;
    absences: number;
    totalAbsences: number;
};

export function AttendanceRow({ discipline, absences, totalAbsences }: AttendanceProps ){

    const percentage = Math.min(Math.round((absences / totalAbsences) * 100), 100);

    // analisar qual seria o nivel critico. deixei 75% por agora
    const isCritical = absences >= (totalAbsences * 0.75);

  return (
    <View style={styles.container}>

      <View style={styles.topRow}>
        <Text style={styles.title}>{discipline}</Text>
        <Text style={styles.subject}>{absences}/{totalAbsences}</Text>
      </View>

      <View style={styles.progressBarTrack}>
        <View 
          style={[
            styles.progressBarFill, 
            { 
              width: `${percentage}%`,
              backgroundColor: isCritical ? '#EF4444' : '#3B82F6' // Vermelho se crítico, Azul normal
            }
          ]} 
        />
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingBottom: 4,
    paddingTop: 4,
    borderRadius: 12,
  },
  title: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.fontSize.sm,
    color: colors.text,
  },
  subject: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    marginTop: 0,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 8,
  },
  progressBarTrack: {
    height: 6,
    backgroundColor: '#E5E7EB', // Fundo cinza claro da barra
    borderRadius: 3,
    width: '100%',
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 3,
  },
});