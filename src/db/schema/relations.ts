import { relations } from "drizzle-orm";
import { absences } from "./absences";
import { assessments } from "./assessments";
import { courses } from "./courses";
import { scheduleSlots } from "./scheduleSlots";
import { semesters } from "./semesters";
import { users } from "./users";

/*
  Tabelas que tem FK precisam ser relacionadas usando fields e references, use a tabela de users e googleAccount como exemplos,
  users apenas indica relação com googleAccounts, porém a FK de users.id vive em googleAccounts, então referenciamos usando:
  user: one(users, {
    fields: [googleAccounts.userId],
    references: [users.id],
  }),
*/

export const usersRelations = relations(users, ({ many }) => ({
  courses: many(courses),
}));

export const semestersRelations = relations(semesters, ({ many }) => ({
  courses: many(courses),
}));

export const coursesRelations = relations(courses, ({ one, many }) => ({
  user: one(users, {
    fields: [courses.userId],
    references: [users.id],
  }),
  semester: one(semesters, {
    fields: [courses.semesterId],
    references: [semesters.id],
  }),
  assessments: many(assessments),
  scheduleSlots: many(scheduleSlots),
  absences: many(absences),
}));

export const assessmentsRelations = relations(assessments, ({ one }) => ({
  subject: one(courses, {
    fields: [assessments.subjectId],
    references: [courses.id],
  }),
}));

export const scheduleSlotsRelations = relations(scheduleSlots, ({ one }) => ({
  subject: one(courses, {
    fields: [scheduleSlots.subjectId],
    references: [courses.id],
  }),
}));

export const absencesRelations = relations(absences, ({ one }) => ({
  subject: one(courses, {
    fields: [absences.subjectId],
    references: [courses.id],
  }),
}));
