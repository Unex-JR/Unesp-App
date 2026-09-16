import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { CalendarDays, GraduationCap, Hash, MapPin, X, type LucideIcon, PenLineIcon } from 'lucide-react-native';
import { colors, typography } from '@/theme';
import { TaskItem } from '@/components/TaskItem';

type Assessment = {
  title: string;
  discipline: string;
  deadline: string;
};

type TaskItemModalProps = {
  assignment: Assessment | null;
  visible: boolean;
  onClose: () => void;
};

export function TaskItemModal({
  assignment,
  visible,
  onClose,
}: TaskItemModalProps) {
  if (!assignment) {
    return null;
  }


const assessments: Assessment[] = [
    {
        title: 'Prova 1',
        discipline: 'ATP',
        deadline: '15/10/2026',
    },
    {
        title: 'Trabalho prático',
        discipline: 'ATP',
        deadline: '22/10/2026',
    },
    {
        title: 'Prova 2',
        discipline: 'ATP',
        deadline: '15/10/2026',
    },
    {
        title: 'Trabalho prático 2',
        discipline: 'ATP',
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
                        <Text style={styles.title}>{assignment.title}</Text>
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

                <View style={styles.content}>
                    <View style={styles.infoList}>
                        <InfoRow icon={Hash} label="Disciplina" value={assignment.discipline} />
                        <InfoRow icon={CalendarDays} label="Prazo" value={assignment.deadline} />
                    </View>
                </View>
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
