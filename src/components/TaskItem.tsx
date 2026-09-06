import { View, Text, StyleSheet } from 'react-native';
import { colors, typography } from '@/theme';

type TaskItemProps = {
    title: string;
    subject: string;
    deadline: string;
};

export function TaskItem({ title, subject, deadline }: TaskItemProps ){
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subject}>{subject}</Text>
      </View>
      <View style={styles.tag}>
        <Text style={styles.tagText}>{deadline}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.05)',
  },
  title: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize.base,
    color: colors.text,
  },
  subject: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    marginTop: 0,
  },
  tag: {
    backgroundColor: '#FFE5E5', 
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 16,
  },
  tagText: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.fontSize.xs,
    color: '#D32F2F',
  }
});