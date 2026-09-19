// recebe as datas e repassa pra tela principal qual o dia o usuario clicou

import { View, Text, StyleSheet, Pressable } from 'react-native';
import { colors, typography } from '@/theme';

import { ChevronLeft, ChevronRight } from 'lucide-react-native';

type WeekSelectorProps = {
    period: string;
    activeDay: string;
    days: { label: string; date: string }[];
    onDayPress: (day: string) => void;
    onPrevWeek?: () => void;
    onNextWeek?: () => void;
};

export function WeekSelector({ period, activeDay, days, onDayPress, onPrevWeek, onNextWeek }: WeekSelectorProps ){
  return (
    <View style={styles.container}>

        {/* botões de navegação e período */}
        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
            <Pressable
              onPress={onPrevWeek}
              style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }, { padding: 8 }]}
              accessibilityLabel="Botão para semana anterior"
            >
              <ChevronLeft size={20} color={colors.text}/>
            </Pressable>
            
            <Text style={styles.title}>{period}</Text>

            <Pressable
              onPress={onNextWeek}
              style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }, { padding: 8 }]}
              accessibilityLabel="Botão para a próxima semana"
            >
              <ChevronRight size={20} color={colors.text}/>
            </Pressable>
        </View>

        <View style={styles.daysRow}>
          {days.map((day) => {
            const isActive = activeDay === day.date;

            return (
             <Pressable
                key={day.date}
                style={[styles.day, isActive && styles.activeDay]}
                onPress={() => onDayPress(day.date)}
              >
                <Text style={[styles.dayLabel, isActive && styles.activeDayText]}>{day.label}</Text>
                <Text style={[styles.dayNumber, isActive && styles.activeDayText]}>{day.date}</Text>
              </Pressable>
            );
          })}
        </View>

    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  title: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize.sm,
    color: colors.text,
  },
  daysRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 14,
    width: '100%',
  },
  day: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: `${colors.white}50`,
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  activeDay: {
    backgroundColor: colors.primaryBlue,
  },
  dayLabel: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.sm,
    color: `${colors.textSecondary}${80}`,
  },
  dayNumber: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize.sm,
    color: colors.text,
    marginTop: 2,
  },
  activeDayText: {
    color: colors.white,
  }
});