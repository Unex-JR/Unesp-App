import {
  CourseDetails,
  CourseDetailsModal,
} from "@/components/CoursesScreen/CourseDetailsModal";
import { CourseItem } from "@/components/CoursesScreen/CourseItem";
import { colors, typography } from "@/theme";
import { ChevronDown } from "lucide-react-native";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";

async function handleAddCourse() {}

export default function CoursesScreen() {
  const insets = useSafeAreaInsets();
  const [selectedDiscipline, setSelectedDiscipline] =
    useState<CourseDetails | null>(null);

  const disciplines: CourseDetails[] = [];

  return (
    <View
      style={[
        styles.container,
        { paddingTop: 16 + insets.top, paddingBottom: 16 + insets.bottom },
      ]}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Disciplinas</Text>
      </View>

      {/* Filtros */}
      {/* Provavelmente tirar, pois não teremos conexão com o sisgrad */}
      <View style={styles.disciplineFilter}>
        <View style={styles.filterItem}>
          <Text style={styles.filterItemText}>2026</Text>
          <ChevronDown size={16} />
        </View>
        <View style={styles.filterItem}>
          <Text style={styles.filterItemText}>2º semestre</Text>
          <ChevronDown size={16} />
        </View>
      </View>

      {/* Cards das disciplinas */}
      <ScrollView
        style={styles.disciplineScroll}
        contentContainerStyle={styles.disciplineScrollContent}
      >
        <View style={styles.disciplineGrid}>
          {disciplines.map((discipline) => (
            <CourseItem
              key={discipline.id}
              title={discipline.name}
              local={discipline.local}
              professor={discipline.professor}
              frequency={discipline.frequency}
              code={discipline.code}
              onPress={() => setSelectedDiscipline(discipline)}
            />
          ))}
        </View>
      </ScrollView>

      <CourseDetailsModal
        discipline={selectedDiscipline}
        visible={selectedDiscipline !== null}
        onClose={() => setSelectedDiscipline(null)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundPage,
    padding: 16,
    borderRadius: 8,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontFamily: typography.fontFamily.extrabold,
    fontSize: typography.fontSize["2xl"],
    color: colors.text,
  },
  disciplineFilter: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginVertical: 8,
    gap: 6,
    alignContent: "center",
  },
  disciplineGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 4,
  },
  disciplineScroll: {
    flex: 1,
  },
  disciplineScrollContent: {
    paddingBottom: 16,
  },
  filterItem: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
  },
  filterItemText: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.fontSize.xs,
    color: colors.text,
  },
});
