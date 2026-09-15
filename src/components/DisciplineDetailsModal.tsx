import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { CalendarDays, GraduationCap, Hash, MapPin, X, type LucideIcon, PenLineIcon } from 'lucide-react-native';
import { colors, typography } from '@/theme';
import { TaskItem } from '@/components/TaskItem';

type Assessment = {
  id: string;
  title: string;
  deadline: string;
};

export type DisciplineDetails = {
  id: string;
  name: string;
  code: string;
  professor: string;
  local: string;
  frequency: number;
};

type DisciplineDetailsModalProps = {
  discipline: DisciplineDetails | null;
  visible: boolean;
  onClose: () => void;
};

export function DisciplineDetailsModal({
  discipline,
  visible,
  onClose,
}: DisciplineDetailsModalProps) {
  if (!discipline) {
    return null;
  }


  const freq = discipline.frequency;
  const freqAccent =
    freq >= 75 ? colors.secondaryBlue
    : freq >= 70 ? colors.attention
    : colors.alert;
  const freqBg =
    freq >= 85 ? colors.tertiaryBlue
    : freq >= 75 ? '#FEF3E2'
    : '#FDE8E4';

    const assessments: Assessment[] = [
        {
            id: 'p1',
            title: 'Prova 1',
            deadline: '15/10/2026',
        },
        {
            id: 'trabalho-1',
            title: 'Trabalho prático',
            deadline: '22/10/2026',
        },
        {
            id: 'p1-2',
            title: 'Prova 2',
            deadline: '15/10/2026',
        },
        {
            id: 'trabalho-1-2',
            title: 'Trabalho prático 2',
            deadline: '22/10/2026',
        },
    ];

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />

        <View style={styles.card}>
          <View style={styles.header}>
            <View style={styles.headerText}>
              <Text style={styles.code}>{discipline.code}</Text>
              <Text style={styles.title}>{discipline.name}</Text>
            </View>

            <Pressable
              accessibilityLabel="Fechar detalhes da disciplina"
              hitSlop={10}
              onPress={onClose}
              style={styles.closeButton}
            >
              <X size={20} color={colors.textSecondary} />
            </Pressable>
          </View>

          <ScrollView
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}
          >
            {/* card de frequência */}
            <View style={[styles.frequencyCard, { backgroundColor: freqBg }]}>
              <View style={styles.frequencyTop}>
                <View>
                  <Text style={styles.frequencyLabel}>Frequência</Text>
                  <Text style={styles.frequencyHint}>4 de 18 faltas permitidas</Text>
                </View>
                <Text style={[styles.frequencyValue, { color: freqAccent }]}>
                  {discipline.frequency}%
                </Text>
              </View>
              {/* barra de progresso */}
              <View style={styles.freqProgressTrack}>
                <View
                  style={[
                    styles.freqProgressBar,
                    {
                      width: `${discipline.frequency}%` as `${number}%`,
                      backgroundColor: freqAccent,
                    },
                  ]}
                />
              </View>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 8, marginTop: 26, marginBottom: 10 }}>
                <Text style={styles.sectionTitle}>Informações</Text>
                <PenLineIcon size={16} color={colors.textSecondary} />
            </View>
            
            <View style={[styles.infoList, { marginBottom: 26 }]}>
              <InfoRow icon={GraduationCap} label="Professor" value={discipline.professor} />
              <InfoRow icon={MapPin} label="Local" value={discipline.local} />
              <InfoRow icon={Hash} label="Código" value={discipline.code} />
              <InfoRow icon={CalendarDays} label="Período" value="2º semestre - 2026" />
            </View>

            <Text style={styles.sectionTitle}>Próximas avaliações</Text>
            {assessments.length > 0 ? (
                assessments.map((assessment) => (
                    <TaskItem
                    key={assessment.id}
                    title={assessment.title}
                    subject={discipline.name}
                    deadline={assessment.deadline}
                    />
                ))
                ) : (
                <View style={[styles.emptyState, { marginTop: 12 }]}>
                    <Text style={styles.emptyTitle}>
                    Nenhuma avaliação cadastrada
                    </Text>
                    <Text style={styles.emptyText}>
                    As próximas provas e trabalhos aparecerão aqui.
                    </Text>
                </View>
                )}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

function InfoRow({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) {
  return (
    <View style={styles.infoRow}>
      <View style={styles.infoLabelGroup}>
        <Icon color={colors.secondaryBlue} size={18} />
        <Text style={styles.infoLabel}>{label}</Text>
      </View>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'rgba(15, 22, 32, 0.55)',
  },
  card: {
    maxHeight: '88%',
    backgroundColor: colors.surface,
    borderRadius: 24,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 22,
    paddingBottom: 18,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerText: {
    flex: 1,
    paddingRight: 16,
  },
  code: {
    alignSelf: 'flex-start',
    color: colors.secondaryBlue,
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize.xs,
    letterSpacing: 0.5,
    marginBottom: 6,
    textTransform: 'uppercase',
  },
  title: {
    color: colors.text,
    fontFamily: typography.fontFamily.extrabold,
    fontSize: typography.fontSize.xl,
    lineHeight: 25,
  },
  closeButton: {
    alignItems: 'center',
    backgroundColor: colors.backgroundPage,
    borderRadius: 20,
    height: 36,
    justifyContent: 'center',
    width: 36,
  },
  content: {
    padding: 20,
    paddingBottom: 36,
  },
  frequencyCard: {
    backgroundColor: colors.tertiaryBlue,
    borderRadius: 16,
    flexDirection: 'column',
    gap: 12,
    padding: 16,
  },
  frequencyTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  freqProgressTrack: {
    height: 6,
    borderRadius: 99,
    backgroundColor: 'rgba(0,0,0,0.08)',
    overflow: 'hidden',
  },
  freqProgressBar: {
    height: 6,
    borderRadius: 99,
  },
  frequencyLabel: {
    color: colors.text,
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize.base,
  },
  frequencyHint: {
    color: colors.textSecondary,
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.xs,
    marginTop: 3,
  },
  frequencyValue: {
    color: colors.secondaryBlue,
    fontFamily: typography.fontFamily.extrabold,
    fontSize: typography.fontSize['2xl'],
  },
  sectionTitle: {
    color: colors.text,
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize.lg,

  },
  infoList: {
    borderColor: colors.border,
    borderRadius: 14,
    borderWidth: 1,
    overflow: 'hidden',
  },
  infoRow: {
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  infoLabel: {
    color: colors.textSecondary,
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.sm,
  },
  infoLabelGroup: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  infoValue: {
    color: colors.text,
    flexShrink: 1,
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.fontSize.sm,
    marginLeft: 16,
    textAlign: 'right',
  },
  emptyState: {
    backgroundColor: colors.backgroundPage,
    borderRadius: 14,
    padding: 16,
  },
  emptyTitle: {
    color: colors.text,
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.fontSize.sm,
  },
  emptyText: {
    color: colors.textSecondary,
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.xs,
    lineHeight: 18,
    marginTop: 4,
  },
});
