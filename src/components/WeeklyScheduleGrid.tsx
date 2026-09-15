import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { colors, typography } from '@/theme';
import { PenLineIcon } from 'lucide-react-native';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';

export type GridClass = {
    id: string;
    discipline: string;
    startTime: string; // hh:mm
    endTime: string; // hh:mm
    dayIndex: number; // 0 = Seg até 5 = Sáb
    color?: string; // cor do card
    isEditing?: boolean; // indica se está em modo de edição
    onToggleEdit?: () => void; // função para alternar o modo de edição
    location?: string; // local da aula
};

type WeeklyScheduleGridProps = {
    classes: GridClass[];
    onClassPress?: (cls: GridClass) => void;
    onToggleEdit?: () => void;
    isEditing?: boolean;
};


const DAYS = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

// primeira e última hora exibidas na grade
const START_HOUR = 8;
const END_HOUR = 23;

const HOUR_HEIGHT = 26;
const TIME_COL_WIDTH = 26;

function timeToMinutes(time: string): number {
    const [h, m] = time.split(':').map(Number);
    return h * 60 + m;
}

function minutesFromGridStart(time: string): number {
    return timeToMinutes(time) - START_HOUR * 60;
}


export function WeeklyScheduleGrid({ classes, onClassPress, onToggleEdit, isEditing }: WeeklyScheduleGridProps) {
    const totalMinutes = (END_HOUR - START_HOUR) * 60;
    const gridHeight = (totalMinutes / 60) * HOUR_HEIGHT;

    const hours = Array.from(
        { length: END_HOUR - START_HOUR + 1 },
        (_, i) => START_HOUR + i,
    );

    // fundo do botão de edição
    const animatedContainerStyle = useAnimatedStyle(() => {
        return {
            // se estiver editando, fundo azul. se não, transparente
            backgroundColor: withTiming(
                isEditing ? colors.primaryBlue : 'transparent',
                { duration: 500 },
            ),
            paddingHorizontal: withTiming(isEditing ? 8 : 4, { duration: 500 }),
            paddingVertical: withTiming(isEditing ? 2 : 0, { duration: 500 }),
            borderRadius: 12,
        }
    })

    // texto gradual
    const animatedTextStyle = useAnimatedStyle(() => {
        return {
            width: withTiming(isEditing ? 75 : 0, { duration: 500 }),
            height: withTiming(isEditing ? 16 : 0, { duration: 500 }),
            opacity: withTiming(isEditing ? 1 : 0, { duration: 1000 }),
        }
    })

    return (
        <View style={styles.wrapper}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8, marginBottom: 12 }}>
                <Text style={styles.sectionTitle}>Grade Semanal</Text>

                <Pressable
                    style={({ pressed }) => [
                        {
                            opacity: pressed ? 0.6 : 1,
                            padding: 4,
                            borderRadius: 4,
                        },
                    ]}
                    onPress={() => {
                        onToggleEdit?.();
                    }}
                >
                    <Animated.View style={[animatedContainerStyle, { flexDirection: 'row', alignItems: 'center' }]}>
                        <Animated.Text style={[animatedTextStyle, { fontFamily: typography.fontFamily.bold, fontSize: typography.fontSize.xxs, color: colors.white }]} numberOfLines={1}>
                            {isEditing ? 'Modo Edição' : ''}
                        </Animated.Text>
                        <PenLineIcon 
                            size={16}
                            color={isEditing ? colors.white : `${colors.text}66`}/>
                    </Animated.View>
                </Pressable>
            </View>
            

            {/* dias da semana */}
            <View style={styles.header}>
                <View style={{ width: TIME_COL_WIDTH }} />
                {DAYS.map((day) => (
                    <View key={day} style={styles.dayHeader}>
                        <Text style={styles.dayHeaderText}>{day}</Text>
                    </View>
                ))}
            </View>

            <ScrollView horizontal={false} showsVerticalScrollIndicator={false}>
                <View style={[styles.gridBody, { height: gridHeight }]}>

                    {/* coluna de horários + linhas horizontais */}
                    <View style={[styles.timeColumn, { height: gridHeight }]}>
                        {hours.map((h) => (
                            <View
                                key={h}
                                style={[styles.hourRow, { height: HOUR_HEIGHT }]}
                            >
                                <Text style={styles.hourLabel}>
                                    {String(h).padStart(2, '0')}h
                                </Text>
                            </View>
                        ))}
                    </View>

                    {/* colunas dos dias com as aulas */}
                    {DAYS.map((day, dayIdx) => {
                        const dayClasses = classes.filter((c) => c.dayIndex === dayIdx);

                        return (
                            <View key={day} style={[styles.dayColumn, { height: gridHeight }]}>
                                {/* linhas de hora de fundo */}
                                {hours.map((h) => (
                                    <View
                                        key={h}
                                        style={[styles.hourLine, { top: (h - START_HOUR) * HOUR_HEIGHT }]}
                                    />
                                ))}

                                {/* cards das aulas */}
                                {dayClasses.map((cls) => {
                                    const topOffset = (minutesFromGridStart(cls.startTime) / 60) * HOUR_HEIGHT;
                                    const durationMin =
                                        timeToMinutes(cls.endTime) - timeToMinutes(cls.startTime);
                                    const cardHeight = Math.max((durationMin / 60) * HOUR_HEIGHT - 4, 20);
                                    const bgColor = cls.color ?? colors.primaryBlue;

                                    return (
                                        <Pressable
                                            key={cls.id}
                                            style={({ pressed }) => [
                                                styles.classCard,
                                                {
                                                    top: topOffset + 1,
                                                    height: cardHeight,
                                                    backgroundColor: bgColor,
                                                    opacity: pressed ? 0.8 : 1,
                                                    borderWidth: isEditing ? 1 : 0,
                                                    borderColor: colors.white,
                                                    borderStyle: 'dashed',
                                                },
                                            ]}
                                            onPress={() => onClassPress?.(cls)}
                                            accessibilityRole="button"
                                            accessibilityLabel={`Abrir detalhes de ${cls.discipline}`}
                                        >
                                            <Text style={styles.classTime} numberOfLines={1}>
                                                {cls.startTime}
                                            </Text>
                                            <Text style={styles.className} numberOfLines={2}>
                                                {cls.discipline}
                                            </Text>
                                        </Pressable>
                                    );
                                })}
                            </View>
                        );
                    })}
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        marginTop: 20,
        backgroundColor: colors.surface,
        borderRadius: 16,
        padding: 12,
        overflow: 'hidden',
    },
    sectionTitle: {
        fontFamily: typography.fontFamily.bold,
        fontSize: typography.fontSize.base,
        color: colors.text,
    },

    // cabeçalho
    header: {
        flexDirection: 'row',
        marginBottom: 4,
    },
    dayHeader: {
        flex: 1,
        alignItems: 'center',
    },
    dayHeaderText: {
        fontFamily: typography.fontFamily.semibold,
        fontSize: typography.fontSize.xs,
        color: colors.textSecondary,
    },

    // grade
    gridBody: {
        flexDirection: 'row',
    },

    // coluna de horários
    timeColumn: {
        width: TIME_COL_WIDTH,
    },
    hourRow: {
        justifyContent: 'flex-start',
        paddingTop: 2,
    },
    hourLabel: {
        fontFamily: typography.fontFamily.regular,
        fontSize: typography.fontSize.xxs,
        color: colors.textTertiary,
        textAlign: 'right',
        paddingRight: 4,
    },

    // colunas dos dias
    dayColumn: {
        flex: 1,
        borderLeftWidth: 1,
        borderLeftColor: colors.border,
        position: 'relative',
    },
    hourLine: {
        position: 'absolute',
        left: 0,
        right: 0,
        height: 1,
        backgroundColor: colors.border,
    },

    // cards de aula
    classCard: {
        position: 'absolute',
        left: 2,
        right: 2,
        borderRadius: 6,
        paddingHorizontal: 4,
        paddingVertical: 3,
        overflow: 'hidden',
    },
    classTime: {
        fontFamily: typography.fontFamily.bold,
        fontSize: 9,
        color: colors.white,
        opacity: 0.85,
    },
    className: {
        fontFamily: typography.fontFamily.semibold,
        fontSize: 9,
        color: colors.white,
        lineHeight: 12,
    },
});
