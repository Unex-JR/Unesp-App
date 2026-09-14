import { Pressable, Text, StyleSheet, View } from 'react-native';
import { colors, typography } from '@/theme';

type DisciplineItemProps = {
  title: string;
  local: string;
  professor: string;
  frequency: number;
  code: string;
  onPress?: () => void;
};

function getFrequencyColor(frequency: number): string {
  if (frequency >= 85) return colors.white;         // seguro
  if (frequency >= 75) return '#f1b738';            // atenção
  return '#f06b5f';                                 // reprovado
}

export function DisciplineItem({ title, local, professor, frequency, code, onPress }: DisciplineItemProps) {
  const freqColor = getFrequencyColor(frequency);

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Abrir detalhes de ${title}`}
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        pressed && styles.pressed,
      ]}
    >
        <Text style={styles.eyebrow}>{code}</Text>
      <View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subject}>{local}</Text>
        <Text style={styles.subject}>{professor}</Text>
      </View>
      <View style={styles.tag}>
        <View style={styles.frequencyRow}>
            <Text style={styles.tagSubject}>Frequência:</Text>
            <Text style={[styles.tagText, { color: freqColor }]}>{frequency}%</Text>
        </View>
        {/* Barra de progresso */}
        <View style={styles.progressTrack}>
          <View
            style={[
              styles.progressBar,
              {
                width: `${frequency}%` as `${number}%`,
                backgroundColor: freqColor,
              },
            ]}
          />
        </View>
      </View>
    </Pressable>
  );
}


const styles = StyleSheet.create({
  container: {
    width: '48%',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundColor: colors.primaryBlue,
    padding: 12,
    borderRadius: 16,
    marginBottom: 12,
    gap: 6,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.08)',
  },
  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.97 }],
  },
  title: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize.sm,
    color: colors.white,
  },
  subject: {
    fontFamily: typography.fontFamily.light,
    fontSize: typography.fontSize.xxs,
    color: colors.white,
    marginTop: 0,
  },
  tag: {
    width: '100%',
    gap: 6,
    marginTop: 10,
  },
  eyebrow: {
    fontFamily: typography.fontFamily.semibold,
    color: `${colors.white}CC`,
    textTransform: 'uppercase',
    fontSize: 9,
    letterSpacing: 0.5,
    backgroundColor: `${colors.white}33`,
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 12,
  },
  tagSubject: {
    fontFamily: typography.fontFamily.monospace,
    fontSize: typography.fontSize.xxs,
    color: `${colors.white}CC`,
  },
  tagText: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize.xs,
    color: colors.white,
  },
  frequencyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: `${colors.tertiaryBlue}33`,
    paddingVertical: 5,
    paddingHorizontal: 6,
    borderRadius: 8,
  },
  progressTrack: {
    height: 4,
    borderRadius: 99,
    backgroundColor: `${colors.white}33`,
    overflow: 'hidden',
  },
  progressBar: {
    height: 4,
    borderRadius: 99,
  },
});