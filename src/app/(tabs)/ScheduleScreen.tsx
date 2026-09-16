import {
    DisciplineDetails,
    DisciplineDetailsModal,
} from "@/components/DisciplineDetailsModal";
import { ScheduleItem } from "@/components/ScheduleItem";
import { GridClass, WeeklyScheduleGrid } from "@/components/WeeklyScheduleGrid";
import { WeekSelector } from "@/components/WeekSelector";
import { colors, typography } from "@/theme";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ScheduleScreen() {
  const insets = useSafeAreaInsets();

  const [selectedDay, setSelectedDay] = useState("07");
  const [selectedClass, setSelectedClass] = useState<DisciplineDetails | null>(
    null,
  );

  // apenas para teste
  const weekDays = [
    { label: "Seg", date: "07" },
    { label: "Ter", date: "08" },
    { label: "Qua", date: "09" },
    { label: "Qui", date: "10" },
    { label: "Sex", date: "11" },
    { label: "Sáb", date: "12" },
  ];

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
        id: "calculus-3",
        name: "Cálculo 3",
        code: "CC2666",
        professor: "Prof. Waldemar",
        local: "Lab 3 - Bloco D",
        frequency: 78,
      },
    },
  ];

  // grade horária semanal (apenas para teste)
  const gridClasses: GridClass[] = [
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
    // sábado
    {
      id: "g12",
      discipline: "Estrutura de Dados",
      startTime: "08:00",
      endTime: "10:00",
      dayIndex: 5,
      color: "#7C63D9",
    },
  ];

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
          period="07 - 14 de setembro"
          days={weekDays}
          activeDay={selectedDay}
          onDayPress={setSelectedDay}
        ></WeekSelector>

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

        <View>
          {scheduleItems.map((item, index) => (
            <ScheduleItem
              key={index}
              discipline={item.discipline}
              location={item.location}
              startTime={item.startTime}
              endTime={item.endTime}
              onPress={() => setSelectedClass(item.details)}
            />
          ))}
        </View>

        <WeeklyScheduleGrid
          classes={gridClasses}
          onClassPress={(cls) => {
            const match = scheduleItems.find(
              (s) => s.discipline === cls.discipline,
            );
            if (match) setSelectedClass(match.details);
          }}
        />
      </ScrollView>

      <DisciplineDetailsModal
        discipline={selectedClass}
        visible={selectedClass !== null}
        onClose={() => setSelectedClass(null)}
      />
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
});
