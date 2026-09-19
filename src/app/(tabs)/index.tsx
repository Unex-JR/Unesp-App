import { colors, typography } from "@/theme";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

// componentes
import { AttendanceRow } from "@/components/AttendanceRow";
import { NextClass, NextClassCarousel } from "@/components/NextClassCarousel";
import { ShortcutItemCard } from "@/components/ShortcutItem";
import { TaskItem } from "@/components/TaskItem";
import { TaskItemModal } from "@/components/TaskItemModal";

// icones
import {
    GraduationCapIcon,
    User2,
    UtensilsCrossedIcon,
} from "lucide-react-native";

// hooks
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Link, useRouter } from "expo-router";
import { useState } from "react";

// tipo para passar no onPress do taskItem
type taskData = {
  title: string;
  discipline: string;
  deadline: string;
};

export default function Home() {
  const router = useRouter();

  const insets = useSafeAreaInsets();

  // apenas para teste — virá do banco de dados
  const todayClasses: NextClass[] = [
    {
      id: "c1",
      title: "Aula de Física",
      subject: "Lab 3 - Bloco D",
      start: "08:00",
      end: "09:30",
      minutes: 30,
    },
    {
      id: "c2",
      title: "Álgebra Linear",
      subject: "Sala 204 - Bloco A",
      start: "10:00",
      end: "12:00",
      minutes: 150,
    },
    {
      id: "c3",
      title: "Programação Orientada a Objetos",
      subject: "Lab 1 - Bloco C",
      start: "14:00",
      end: "16:00",
      minutes: 330,
    },
  ];

  const [selectedTask, setSelectedTask] = useState<taskData | null>(null);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }}
    >
      <View
        style={[
          styles.horizontalContent,
          {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 16,
          },
        ]}
      >
        <View>
          <Text style={styles.title}>Bom dia, Vitor</Text>
          <Text style={styles.subtitle}>Sábado, 5 de Setembro</Text>
        </View>

        <View style={{ padding: 6, borderRadius: 30 }}>
          <User2 size={22} color="#999" />
        </View>
      </View>

      <NextClassCarousel classes={todayClasses} />

      <View style={styles.horizontalContent}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            marginTop: 6,
            marginBottom: 4,
          }}
        >
          <Link href="https://sistemas.unesp.br/central/#/sistemas">
            <ShortcutItemCard
              title="SISGRAD"
              icon={<GraduationCapIcon size={20} color={colors.white} />}
            />
          </Link>
          <Link href="https://sistemas.unesp.br/">
            <ShortcutItemCard
              title="SISRU"
              icon={<UtensilsCrossedIcon size={20} color={colors.white} />}
            />
          </Link>
          <Link href="https://classroom.google.com/h/st">
            <ShortcutItemCard
              title="Sala de Aula"
              icon={<UtensilsCrossedIcon size={20} color={colors.white} />}
            />
          </Link>
        </View>
      </View>

      <View style={[styles.horizontalContent, { marginTop: 8 }]}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 6,
            marginBottom: 10,
          }}
        >
          <Text style={styles.sectionTitle}>Próximas tarefas</Text>
          <Pressable onPress={() => router.push("/AssessmentsScreen")}>
            <Text style={styles.viewAllText}>Ver todas</Text>
          </Pressable>
        </View>

        <TaskItem
          title="Trabalho de ATP"
          subject="ATP"
          deadline="Hoje 23:59"
          onPress={() =>
            setSelectedTask({
              title: "Trabalho de ATP",
              discipline: "ATP",
              deadline: "Hoje 23:59",
            })
          }
        />
        <TaskItem
          title="Avaliação 2"
          subject="Álgebra Linear"
          deadline="Hoje 23:59"
          onPress={() =>
            setSelectedTask({
              title: "Avaliação 2",
              discipline: "Álgebra Linear",
              deadline: "Hoje 23:59",
            })
          }
        />
        <TaskItem
          title="Trabalho de ATP"
          subject="ATP"
          deadline="Hoje 23:59"
          onPress={() =>
            setSelectedTask({
              title: "Trabalho de ATP",
              discipline: "ATP",
              deadline: "Hoje 23:59",
            })
          }
        />
      </View>

      <View style={styles.horizontalContent}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 6,
            marginBottom: 2,
          }}
        >
          <Text style={[styles.sectionTitle, { marginTop: 8 }]}>
            Frequências
          </Text>
          <Pressable onPress={() => router.push("/FrequencyScreen")}>
            <Text style={[styles.viewAllText, { marginTop: 8 }]}>
              Ver todas
            </Text>
          </Pressable>
        </View>

        <View
          style={[
            styles.horizontalContent,
            {
              flexDirection: "column",
              backgroundColor: colors.white,
              paddingVertical: 10,
              borderRadius: 14,
              marginTop: 8,
              marginBottom: 8,
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.05)",
            },
          ]}
        >
          <AttendanceRow
            discipline="Álgebra Linear"
            absences={10}
            totalAbsences={18}
          ></AttendanceRow>
          <AttendanceRow
            discipline="Física I"
            absences={19}
            totalAbsences={18}
          ></AttendanceRow>
          <AttendanceRow
            discipline="Linguagens de Programação"
            absences={8}
            totalAbsences={18}
          ></AttendanceRow>
          <AttendanceRow
            discipline="Álgebra Linear"
            absences={10}
            totalAbsences={18}
          ></AttendanceRow>
          <AttendanceRow
            discipline="Física I"
            absences={19}
            totalAbsences={18}
          ></AttendanceRow>
          <AttendanceRow
            discipline="Linguagens de Programação"
            absences={8}
            totalAbsences={18}
          ></AttendanceRow>
        </View>
      </View>

      <TaskItemModal
        assignment={selectedTask}
        visible={selectedTask !== null}
        onClose={() => setSelectedTask(null)}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundPage,
    borderRadius: 8,
  },
  horizontalContent: {
    paddingHorizontal: 16,
  },
  title: {
    fontFamily: typography.fontFamily.extrabold,
    fontSize: typography.fontSize["2xl"],
    color: colors.text,
  },
  subtitle: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
  },
  sectionTitle: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize.sm,
    color: colors.text,
  },
  viewAllButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 30,
  },
  viewAllButtonPressed: {
    opacity: 0.75,
  },
  viewAllText: {
    fontFamily: typography.fontFamily.semibold,
    color: colors.primaryBlue,
    fontSize: typography.fontSize.xs,
  },
});
