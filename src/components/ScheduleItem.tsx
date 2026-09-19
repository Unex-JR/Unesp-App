import { View, Text, StyleSheet, Pressable } from 'react-native';
import { colors, typography } from '@/theme';

type ScheduleItemProps = {
    discipline: string;
    location: string;
    startTime: string;
    endTime: string;
    onPress: () => void;
};

export function ScheduleItem({ discipline, location, startTime, endTime, onPress }: ScheduleItemProps ){
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Abrir detalhes de ${discipline}`}
      onPress={onPress}
      style={({ pressed }) => [
        pressed && styles.pressed,
      ]}
    >
      <View style={styles.container}>
              <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                  <Text style={{fontFamily: typography.fontFamily.bold, fontSize: typography.fontSize.sm}}>{startTime}</Text>
                  <Text style={{fontFamily: typography.fontFamily.regular, fontSize: typography.fontSize.xs}}>{endTime}</Text>
              </View>
              <View style={styles.classContainer}>
                  <Text style={styles.title} numberOfLines={1}>{discipline}</Text>
                  <Text style={styles.subject}>{location}</Text>
              </View>
      </View>
    </Pressable>

    
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 18,
    paddingLeft: 16,
    width: '100%',
    marginBottom: 6,
  },
  classContainer: {
    backgroundColor: colors.primaryBlue,
    borderRadius: 16,
    padding: 8,
    flex: 1,
    minWidth: 0,
    paddingLeft: 16,
  },
  title: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize.sm,
    color: colors.white,
  },
  subject: {
    fontFamily: typography.fontFamily.light,
    fontSize: typography.fontSize.xs,
    color: colors.white,
    marginTop: 0,
  },
    pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.97 }],
  },
});