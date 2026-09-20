import { colors } from '@/theme/colors';
import { typography } from '@/theme';
import { View, Text, StyleSheet } from 'react-native';

type ShortcutItemProps = {
  title: string;
  icon: React.ReactNode;
};

export function ShortcutItemCard({ title, icon }: ShortcutItemProps) {
  return (
    <View style={styles.shortcutWrapper}>
      <View style={styles.shortcutItem}>
        {icon}
      </View>
      <Text style={styles.shortcutText}>
        {title}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  shortcutWrapper: {
    alignItems: 'center',
    marginRight: 16,
    width: 72,
  },
  shortcutItem: {
    backgroundColor: `${colors.primaryBlue}`,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 36,
    height: 50,
    width: 50,
  },
  shortcutText: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.fontSize.xs,
    color: colors.text,
    marginTop: 6,
    textAlign: 'center',
  }

});