import {
    View,
    Text,
    StyleSheet,
    Animated,
    PanResponder,
    useWindowDimensions,
} from 'react-native';
import { useRef, useState, useEffect, useCallback } from 'react';
import { colors, typography } from '@/theme';

export type NextClass = {
    id: string;
    title: string;
    subject: string;
    start: string;
    end: string;
    minutes: number; // minutos até a aula começar
};

type NextClassCarouselProps = {
    classes: NextClass[];
    autoPlayInterval?: number; // intervalo em ms para auto-avançar (padrão: 5000)
};

const DOT_SIZE = 6;
const DOT_GAP = 6;
const SWIPE_THRESHOLD = 50;
const AUTO_PLAY_MS = 5000;

export function NextClassCarousel({
    classes,
    autoPlayInterval = AUTO_PLAY_MS,
}: NextClassCarouselProps) {
    const { width: screenWidth } = useWindowDimensions();
    const CARD_WIDTH = screenWidth - 32; // padding horizontal da tela

    const total = classes.length;
    const [activeIndex, setActiveIndex] = useState(0);

    const translateX = useRef(new Animated.Value(0)).current;
    const opacity = useRef(new Animated.Value(1)).current;

    // ref para o index atual
    const indexRef = useRef(0);

    // animação 
    const animateTo = useCallback(
        (nextIndex: number, direction: 1 | -1) => {
            const outX = -direction * CARD_WIDTH * 0.35;

            // saida + fade-out do card atual
            Animated.parallel([
                Animated.timing(translateX, {
                    toValue: outX,
                    duration: 220,
                    useNativeDriver: true,
                }),
                Animated.timing(opacity, {
                    toValue: 0,
                    duration: 180,
                    useNativeDriver: true,
                }),
            ]).start(() => {
                // troca o conteúdo e reseta posição para o lado oposto
                const wrapped = ((nextIndex % total) + total) % total;
                indexRef.current = wrapped;
                setActiveIndex(wrapped);

                translateX.setValue(direction * CARD_WIDTH * 0.35);

                // entrada e fade-in do proximo
                Animated.parallel([
                    Animated.spring(translateX, {
                        toValue: 0,
                        speed: 14,
                        bounciness: 4,
                        useNativeDriver: true,
                    }),
                    Animated.timing(opacity, {
                        toValue: 1,
                        duration: 200,
                        useNativeDriver: true,
                    }),
                ]).start();
            });
        },
        [CARD_WIDTH, opacity, total, translateX],
    );

    const goNext = useCallback(
        () => animateTo(indexRef.current + 1, 1),
        [animateTo],
    );
    const goPrev = useCallback(
        () => animateTo(indexRef.current - 1, -1),
        [animateTo],
    );

    // auto-play

    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const resetTimer = useCallback(() => {
        if (timerRef.current) clearInterval(timerRef.current);
        timerRef.current = setInterval(goNext, autoPlayInterval);
    }, [autoPlayInterval, goNext]);

    useEffect(() => {
        if (total <= 1) return;
        resetTimer();
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [resetTimer, total]);

    // swipe
    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => false,
            onMoveShouldSetPanResponder: (_, g) =>
                Math.abs(g.dx) > 8 && Math.abs(g.dx) > Math.abs(g.dy),
            onPanResponderGrant: () => {
                // pausa o auto-play enquanto o usuário arrasta
                if (timerRef.current) clearInterval(timerRef.current);
            },
            onPanResponderMove: (_, g) => {
                translateX.setValue(g.dx * 0.4);
            },
            onPanResponderRelease: (_, g) => {
                if (g.dx < -SWIPE_THRESHOLD) {
                    goNext();
                } else if (g.dx > SWIPE_THRESHOLD) {
                    goPrev();
                } else {
                    // volta para o centro
                    Animated.spring(translateX, {
                        toValue: 0,
                        useNativeDriver: true,
                        speed: 20,
                        bounciness: 6,
                    }).start();
                }
                resetTimer();
            },
        }),
    ).current;

    // render
    if (total === 0) return null;

    const cls = classes[activeIndex];

    return (
        <View style={styles.wrapper}>
            <Animated.View
                style={[
                    styles.card,
                    { width: CARD_WIDTH, transform: [{ translateX }], opacity },
                ]}
                {...panResponder.panHandlers}
            >
                {/* etiqueta */}
                {cls.minutes <= 60 ? (
                    <Text style={styles.label}>
                        Próxima aula · em {cls.minutes} min
                    </Text>
                ) : (
                    <Text style={styles.label}>
                        Próxima aula · às {cls.start}
                    </Text>
                )}

                {/* título e local */}
                <View style={styles.body}>
                    <Text style={styles.title} numberOfLines={1}>
                        {cls.title}
                    </Text>
                    <Text style={styles.subject} numberOfLines={1}>
                        {cls.subject}
                    </Text>
                </View>

                {/* horário */}
                <View style={styles.tags}>
                    <View style={styles.tagBg}>
                        <Text style={styles.tagLabel}>Início</Text>
                        <Text style={styles.tagValue}>{cls.start}</Text>
                    </View>
                    <View style={styles.tagBg}>
                        <Text style={styles.tagLabel}>Fim</Text>
                        <Text style={styles.tagValue}>{cls.end}</Text>
                    </View>
                </View>

                {/* dots */}
                {total > 1 && (
                    <View style={styles.dots}>
                        {classes.map((_, i) => (
                            <View
                                key={i}
                                style={[
                                    styles.dot,
                                    i === activeIndex && styles.dotActive,
                                ]}
                            />
                        ))}
                    </View>
                )}
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        alignItems: 'center',
        paddingBottom: 12,
        marginBottom: 2,
        overflow: 'hidden',
    },
    card: {
        backgroundColor: colors.primaryBlue,
        borderRadius: 24,
        padding: 18,
        gap: 6,
        shadowColor: '#000',
        shadowOpacity: 0.12,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 4 },
        elevation: 4,
    },

    label: {
        fontFamily: typography.fontFamily.semibold,
        fontSize: 11,
        letterSpacing: 0.8,
        textTransform: 'uppercase',
        color: `${colors.white}BB`,
    },

    body: {
        marginTop: 2,
    },
    title: {
        fontFamily: typography.fontFamily.bold,
        fontSize: typography.fontSize.base,
        color: colors.white,
    },
    subject: {
        fontFamily: typography.fontFamily.light,
        fontSize: typography.fontSize.xxs,
        color: `${colors.white}CC`,
        marginTop: 2,
    },

    tags: {
        flexDirection: 'row',
        gap: 12,
        marginTop: 10,
    },
    tagBg: {
        backgroundColor: `${colors.white}22`,
        paddingVertical: 6,
        paddingHorizontal: 14,
        borderRadius: 12,
    },
    tagLabel: {
        fontFamily: typography.fontFamily.monospace,
        fontSize: typography.fontSize.xxs,
        color: `${colors.white}BB`,
    },
    tagValue: {
        fontFamily: typography.fontFamily.bold,
        fontSize: typography.fontSize.sm,
        color: colors.white,
    },

    dots: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: DOT_GAP,
        marginTop: 14,
    },
    dot: {
        width: DOT_SIZE,
        height: DOT_SIZE,
        borderRadius: DOT_SIZE / 2,
        backgroundColor: `${colors.white}44`,
    },
    dotActive: {
        backgroundColor: colors.white,
        width: DOT_SIZE * 2.2,
    },
});
