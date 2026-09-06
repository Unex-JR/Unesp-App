import { View, Text, StyleSheet } from 'react-native';
import { colors, typography } from '@/theme';

type NextClassCardProps = {
  minutes: number;
  title: string;
  subject: string;
  start: string;
  end: string;
};

export function NextClassCard({ minutes, title, subject, start, end }: NextClassCardProps) {
  return (
    <View style={styles.container}>
        <Text style={{fontFamily: typography.fontFamily.semibold, color: `${colors.white}CC`, textTransform: 'uppercase', fontSize: 11, letterSpacing: 1}}>Próxima aula - em {minutes} minutos</Text>
      <View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subject}>{subject}</Text>
      </View>
      <View style={styles.tag}>
        <View style={styles.tagBackground}>
            <Text style={styles.tagSubject}>Início:</Text>
            <Text style={styles.tagText}>{start}</Text>
        </View>
        <View style={styles.tagBackground}>
            <Text style={styles.tagSubject}>Fim:</Text>
            <Text style={styles.tagText}>{end}</Text>
        </View>
        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundColor: colors.primaryBlue,
    padding: 16,
    borderRadius: 24,
    marginBottom: 12,
    gap: 6,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.08)',
  },
  title: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize.base,
    color: colors.white,
  },
  subject: {
    fontFamily: typography.fontFamily.thin,
    fontSize: typography.fontSize.sm,
    color: colors.white,
    marginTop: 0,
  },
  tag: {
    flexDirection: 'row',
    gap: 20,
    marginTop: 10,
  },
  tagBackground: {
    backgroundColor: `${colors.tertiaryBlue}33`,
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 12,
    paddingRight: 12,
    borderRadius: 12,
  },
  tagSubject: {
    fontFamily: typography.fontFamily.monospace,
    fontSize: typography.fontSize.xs,
    color: `${colors.white}CC`,
  },
  tagText: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize.sm,
    color: colors.white,
  }
});