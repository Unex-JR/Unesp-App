import {
    DisciplineDetails,
    DisciplineDetailsModal,
} from "@/components/DisciplineDetailsModal";
import { ScheduleItem } from "@/components/ScheduleItem";
import { GridClass, WeeklyScheduleGrid } from "@/components/WeeklyScheduleGrid";
import { WeekSelector } from "@/components/WeekSelector";
import { colors, typography } from "@/theme";
import { BookOpen, Clock3, X } from "lucide-react-native";
import { useState } from "react";
import {
    KeyboardAvoidingView,
    Modal,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const dayLabels = [
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
];

function isValidTime(value: string): boolean {
  const match = /^(?:[01]\d|2[0-3]):[0-5]\d$/.test(value);
  return match;
}

export default function ScheduleScreen() {
  const insets = useSafeAreaInsets();

  const [selectedDay, setSelectedDay] = useState("");
  const [selectedClass, setSelectedClass] = useState<DisciplineDetails | null>(
    null,
  );
  const [isEditing, setIsEditing] = useState(false);
  const [editingClass, setEditingClass] = useState<GridClass | null>(null);
  const [className, setClassName] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [viewedDate, setViewedDate] = useState(new Date()); // inicia no dia atual

  const monday = new Date(viewedDate); // segunda da semana atual
  const dayOfWeek = monday.getDay(); // 0 é domingo, 1 é segunda, assim por diante
  const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek; // se for domingo (0), volta 6 dias; se for segunda (1), não muda; se for terça (2), volta 1 dia, etc.
  monday.setDate(monday.getDate() + diffToMonday);

  // array com a semana inteira
  const labels = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
  const weekDays = labels.map((label, index) => {
    const currentDay = new Date(monday);
    currentDay.setDate(monday.getDate() + index);

    return {
      label,
      date: String(currentDay.getDate()).padStart(2, "0"),
    };
  });

  // para o texto do periodo (por exemplo, 14 - 19 de setembro)
  const saturday = new Date(monday);
  saturday.setDate(monday.getDate() + 5);

  const monthNames = [
    "janeiro",
    "fevereiro",
    "março",
    "abril",
    "maio",
    "junho",
    "julho",
    "agosto",
    "setembro",
    "outubro",
    "novembro",
    "dezembro",
  ];
  const firstMonth = monthNames[monday.getMonth()];
  const lastMonth = monthNames[saturday.getMonth()];

  // se a semana começa e termina no mesmo mês, exibe apenas uma vez
  const periodString =
    monday.getMonth() === saturday.getMonth()
      ? `${monday.getDate()} - ${saturday.getDate()} de ${firstMonth}`
      : `${monday.getDate()} de ${firstMonth} - ${saturday.getDate()} de ${lastMonth}`;

  const scheduleItems = [
    {
      discipline: "Álgebra Linear",
      location: "Lab 3 - Bloco D",
      startTime: "08:00",
      endTime: "10:00",
      details: {
        id: "linear-algebra",
        name: "Álgebra Linear",
        code: "CC2666",
        professor: "Prof. Weber",
        local: "Lab 3 - Bloco D",
        frequency: 88,
      },
    },
    {
      discipline: "Programação Orientada a Objetos",
      location: "Lab 3 - Bloco D",
      startTime: "10:00",
      endTime: "12:00",
      details: {
        id: "object-oriented-programming",
        name: "Programação Orientada a Objetos",
        code: "CC2666",
        professor: "Prof. Freire",
        local: "Lab 3 - Bloco D",
        frequency: 92,
      },
    },
    {
      discipline: "Cálculo 3",
      location: "Lab 3 - Bloco D",
      startTime: "14:00",
      endTime: "16:00",
      details: {
        id: "calculo-3",
        name: "Cálculo 3",
        code: "CC2666",
        professor: "Prof. Waldemar",
        local: "Lab 3 - Bloco D",
        frequency: 78,
      },
    },
  ];

  // grade horária semanal (apenas para teste)
  const initialGridClasses: GridClass[] = [
    // segunda
    {
      id: "g1",
      discipline: "Álgebra Linear",
      startTime: "08:00",
      endTime: "10:00",
      dayIndex: 0,
    },
    {
      id: "g2",
      discipline: "Prog. OO",
      startTime: "10:00",
      endTime: "12:00",
      dayIndex: 0,
    },
    {
      id: "g3",
      discipline: "Cálculo 3",
      startTime: "14:00",
      endTime: "16:00",
      dayIndex: 0,
    },
    // terça
    {
      id: "g4",
      discipline: "Física 2",
      startTime: "08:00",
      endTime: "10:00",
      dayIndex: 1,
      color: "#7C63D9",
    },
    {
      id: "g5",
      discipline: "Estrutura de Dados",
      startTime: "14:00",
      endTime: "16:00",
      dayIndex: 1,
      color: "#7C63D9",
    },
    // quarta
    {
      id: "g6",
      discipline: "Álgebra Linear",
      startTime: "10:00",
      endTime: "12:00",
      dayIndex: 2,
    },
    {
      id: "g7",
      discipline: "Banco de Dados",
      startTime: "16:00",
      endTime: "18:00",
      dayIndex: 2,
      color: "#2E9E6B",
    },
    // quinta
    {
      id: "g8",
      discipline: "Cálculo 3",
      startTime: "08:00",
      endTime: "10:00",
      dayIndex: 3,
    },
    {
      id: "g9",
      discipline: "Física 2",
      startTime: "14:00",
      endTime: "16:00",
      dayIndex: 3,
      color: "#7C63D9",
    },
    // sexta
    {
      id: "g10",
      discipline: "Prog. OO",
      startTime: "08:00",
      endTime: "10:00",
      dayIndex: 4,
    },
    {
      id: "g11",
      discipline: "Banco de Dados",
      startTime: "10:00",
      endTime: "12:00",
      dayIndex: 4,
      color: "#2E9E6B",
    },
  ];

  const [gridClasses, setGridClasses] =
    useState<GridClass[]>(initialGridClasses);

  // indice numerico do dia
  const selectedDayIndex = weekDays.findIndex(
    (day) => day.date === selectedDay,
  );

  //filtra para pegar apenas as aulas do dia
  const classesOfTheDay = gridClasses.filter(
    (cls) => cls.dayIndex === selectedDayIndex,
  );
  classesOfTheDay.sort((a, b) => a.startTime.localeCompare(b.startTime)); // ordena

  function handlePrevWeek() {
    setViewedDate((prev) => {
      const newDate = new Date(prev);
      newDate.setDate(prev.getDate() - 7);
      return newDate;
    });
  }

  function handleNextWeek() {
    setViewedDate((prev) => {
      const newDate = new Date(prev);
      newDate.setDate(prev.getDate() + 7);
      return newDate;
    });
  }

  function openClassEditor(cls: GridClass) {
    setEditingClass(cls);
    setClassName(cls.discipline);
    setStartTime(cls.startTime);
    setEndTime(cls.endTime);
  }

  function closeClassEditor() {
    setEditingClass(null);
    setClassName("");
    setStartTime("");
    setEndTime("");
  }

  function saveClassChanges() {
    if (
      !editingClass ||
      !className.trim() ||
      !isValidTime(startTime.trim()) ||
      !isValidTime(endTime.trim()) ||
      startTime.trim() >= endTime.trim()
    )
      return;

    setGridClasses((currentClasses) =>
      currentClasses.map((cls) =>
        cls.id === editingClass.id
          ? {
              ...cls,
              discipline: className.trim(),
              startTime: startTime.trim(),
              endTime: endTime.trim(),
            }
          : cls,
      ),
    );
    closeClassEditor();
  }

  const hasValidForm =
    className.trim().length > 0 &&
    isValidTime(startTime.trim()) &&
    isValidTime(endTime.trim()) &&
    startTime.trim() < endTime.trim();

  const hasTimeInput = startTime.length > 0 || endTime.length > 0;
  const hasInvalidTime =
    hasTimeInput &&
    (!isValidTime(startTime.trim()) ||
      !isValidTime(endTime.trim()) ||
      startTime.trim() >= endTime.trim());

  return (
    <>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
        }}
      >
        <View>
          <Text style={styles.title}>Grade Horária</Text>
        </View>

        <WeekSelector
          period={periodString}
          days={weekDays}
          activeDay={selectedDay}
          onDayPress={setSelectedDay}
          onPrevWeek={handlePrevWeek}
          onNextWeek={handleNextWeek}
        />

        <View>
          {!selectedDay ? (
            <View
              style={{
                backgroundColor: `${colors.surface}66`,
                borderRadius: 12,
                padding: 50,
                marginBottom: 8,
                borderColor: colors.border,
                borderWidth: 1.5,
                borderStyle: "dashed",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontFamily: typography.fontFamily.regular,
                  fontSize: typography.fontSize.xs,
                  color: colors.textTertiary,
                }}
              >
                Selecione um dia para ver os horários
              </Text>
            </View>
          ) : (
            <>
              <View style={styles.legend}>
                <View style={styles.legendItem}>
                  <View
                    style={[
                      styles.legendColor,
                      { backgroundColor: colors.textTertiary },
                    ]}
                  />
                  <Text style={styles.legendText}>Finalizada</Text>
                </View>
                <View style={styles.legendItem}>
                  <View
                    style={[
                      styles.legendColor,
                      { backgroundColor: colors.primaryBlue },
                    ]}
                  />
                  <Text style={styles.legendText}>Agora</Text>
                </View>
                <View style={styles.legendItem}>
                  <View
                    style={[
                      styles.legendColor,
                      { backgroundColor: colors.attention },
                    ]}
                  />
                  <Text style={styles.legendText}>Mais tarde</Text>
                </View>
              </View>

              {classesOfTheDay.length > 0 ? (
                classesOfTheDay.map((item) => (
                  <ScheduleItem
                    key={item.id}
                    discipline={item.discipline}
                    location={item.location || "Local a definir"}
                    startTime={item.startTime}
                    endTime={item.endTime}
                    onPress={() => {
                      setSelectedClass(
                        scheduleItems.find(
                          (s) => s.discipline === item.discipline,
                        )?.details || null,
                      );
                    }}
                  />
                ))
              ) : (
                <View
                  style={{
                    paddingVertical: 30,
                    alignItems: "center",
                    backgroundColor: `${colors.surface}66`,
                    borderRadius: 12,
                    marginBottom: 8,
                    borderColor: colors.border,
                    borderWidth: 1.5,
                    borderStyle: "dashed",
                  }}
                >
                  <Text
                    style={{
                      fontFamily: typography.fontFamily.regular,
                      fontSize: typography.fontSize.xs,
                      color: colors.textSecondary,
                    }}
                  >
                    Nenhuma aula neste dia. Aproveite o descanso!
                  </Text>
                </View>
              )}
            </>
          )}
        </View>

        <WeeklyScheduleGrid
          classes={gridClasses}
          isEditing={isEditing}
          onToggleEdit={() => setIsEditing((current) => !current)}
          onClassPress={(cls) => {
            // se estiver editando, abre o modal de edição da disciplina
            if (isEditing) {
              openClassEditor(cls);
            }
            // se não estiver editando, abre o modal com os detalhes da disciplina
            else {
              const match = scheduleItems.find(
                (s) => s.discipline === cls.discipline,
              );
              if (match) setSelectedClass(match.details);
            }
          }}
        />
      </ScrollView>

      <DisciplineDetailsModal
        discipline={selectedClass}
        visible={selectedClass !== null}
        onClose={() => setSelectedClass(null)}
      />

      {/* bottomsheet improvisado com modal por enquanto */}
      <Modal
        visible={editingClass !== null}
        animationType="slide"
        transparent={true}
        onRequestClose={closeClassEditor}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={styles.sheetOverlay}
        >
          <Pressable
            style={StyleSheet.absoluteFill}
            onPress={closeClassEditor}
          />
          <View style={[styles.sheet, { paddingBottom: insets.bottom + 24 }]}>
            <View style={styles.sheetHandle} />

            <View style={styles.sheetHeader}>
              <View style={styles.sheetHeaderText}>
                <Text style={styles.sheetEyebrow}>PERSONALIZAR AULA</Text>
                <Text style={styles.sheetTitle}>Editar disciplina</Text>
                <Text style={styles.sheetSubtitle}>
                  {editingClass
                    ? `${dayLabels[editingClass.dayIndex]} • ${editingClass.startTime} - ${editingClass.endTime}`
                    : ""}
                </Text>
              </View>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Fechar edição"
                hitSlop={10}
                onPress={closeClassEditor}
                style={styles.closeButton}
              >
                <X size={18} color={colors.textSecondary} />
              </Pressable>
            </View>

            <View style={styles.fieldHeader}>
              <BookOpen size={16} color={colors.secondaryBlue} />
              <Text style={styles.inputLabel}>Nome da disciplina</Text>
            </View>
            <TextInput
              value={className}
              onChangeText={setClassName}
              placeholder="Ex.: Álgebra Linear"
              placeholderTextColor={colors.textTertiary}
              style={styles.input}
              autoCapitalize="words"
              returnKeyType="next"
            />

            <View style={styles.fieldHeader}>
              <Clock3 size={16} color={colors.secondaryBlue} />
              <Text style={styles.inputLabel}>Horário da aula</Text>
            </View>
            <View style={styles.timeInputs}>
              <TextInput
                value={startTime}
                onChangeText={setStartTime}
                placeholder="08:00"
                placeholderTextColor={colors.textTertiary}
                style={[styles.input, styles.timeInput]}
                keyboardType="numbers-and-punctuation"
                maxLength={5}
              />
              <Text style={styles.timeSeparator}>até</Text>
              <TextInput
                value={endTime}
                onChangeText={setEndTime}
                placeholder="10:00"
                placeholderTextColor={colors.textTertiary}
                style={[styles.input, styles.timeInput]}
                keyboardType="numbers-and-punctuation"
                maxLength={5}
              />
            </View>
            {hasInvalidTime && (
              <Text style={styles.errorText}>
                Use horários no formato 08:00 e certifique-se de que o fim seja
                depois do início.
              </Text>
            )}
            <Text style={styles.helperText}>Exemplo: 08:00 até 10:00</Text>

            <View style={styles.sheetActions}>
              <Pressable onPress={closeClassEditor} style={styles.cancelButton}>
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </Pressable>
              <Pressable
                onPress={saveClassChanges}
                disabled={!hasValidForm}
                style={({ pressed }) => [
                  styles.saveButton,
                  !hasValidForm && styles.disabledButton,
                  pressed && styles.pressedButton,
                ]}
              >
                <Text style={styles.saveButtonText}>Salvar</Text>
              </Pressable>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundPage,
    padding: 16,
    borderRadius: 8,
  },
  title: {
    fontFamily: typography.fontFamily.extrabold,
    fontSize: typography.fontSize["2xl"],
    color: colors.text,
  },
  subtitle: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.base,
    color: colors.textSecondary,
  },
  legendText: {
    fontFamily: typography.fontFamily.light,
    fontSize: typography.fontSize.xs,
    color: colors.text,
  },
  legend: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 8,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  legendColor: {
    width: 10,
    height: 10,
    borderRadius: 2,
  },
  sheetOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  sheet: {
    width: "100%",
    backgroundColor: colors.backgroundPage,
    padding: 24,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
  },
  sheetHandle: {
    width: 40,
    height: 4,
    backgroundColor: "#E5E7EB",
    borderRadius: 2,
    alignSelf: "center",
    marginBottom: 20,
  },
  sheetHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  sheetHeaderText: {
    flex: 1,
    paddingRight: 16,
  },
  sheetEyebrow: {
    color: colors.secondaryBlue,
    fontFamily: typography.fontFamily.bold,
    fontSize: 10,
    letterSpacing: 1,
    marginBottom: 6,
  },
  sheetTitle: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize.xl,
    color: colors.text,
  },
  sheetSubtitle: {
    color: colors.textSecondary,
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.xs,
    marginTop: 5,
  },
  closeButton: {
    alignItems: "center",
    backgroundColor: colors.surface,
    borderRadius: 20,
    height: 36,
    justifyContent: "center",
    width: 36,
  },
  fieldHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    marginBottom: 8,
  },
  inputLabel: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.fontSize.xs,
    color: colors.textSecondary,
  },
  input: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 15,
    color: colors.text,
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.sm,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 16,
  },
  timeInputs: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  timeInput: {
    flex: 1,
    marginBottom: 0,
    textAlign: "center",
  },
  timeSeparator: {
    color: colors.textSecondary,
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.xs,
  },
  helperText: {
    color: colors.textTertiary,
    fontFamily: typography.fontFamily.regular,
    fontSize: 11,
    marginTop: 8,
  },
  errorText: {
    color: colors.alert,
    fontFamily: typography.fontFamily.regular,
    fontSize: 11,
    lineHeight: 16,
    marginTop: 8,
  },
  sheetActions: {
    flexDirection: "row",
    gap: 10,
    marginTop: 24,
  },
  cancelButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 30,
    paddingVertical: 12,
  },
  cancelButtonText: {
    color: colors.textSecondary,
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.fontSize.sm,
  },
  saveButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primaryBlue,
    borderRadius: 30,
    paddingVertical: 12,
  },
  disabledButton: {
    opacity: 0.45,
  },
  pressedButton: {
    opacity: 0.8,
  },
  saveButtonText: {
    color: colors.white,
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize.sm,
  },
});
