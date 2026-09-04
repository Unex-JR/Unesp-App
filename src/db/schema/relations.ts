import { relations } from "drizzle-orm";
import { absences } from "./absences";
import { assessments } from "./assessments";
import { scheduleSlots } from "./scheduleSlots";
import { semesters } from "./semesters";
import { subjects } from "./subjects";
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
  subjects: many(subjects),
}));

export const semestersRelations = relations(semesters, ({ many }) => ({
  subjects: many(subjects),
}));

export const subjectsRelations = relations(subjects, ({ one, many }) => ({
  user: one(users, {
    fields: [subjects.userId],
    references: [users.id],
  }),
  semester: one(semesters, {
    fields: [subjects.semesterId],
    references: [semesters.id],
  }),
  assessments: many(assessments),
  scheduleSlots: many(scheduleSlots),
  absences: many(absences),
}));

export const assessmentsRelations = relations(assessments, ({ one }) => ({
  subject: one(subjects, {
    fields: [assessments.subjectId],
    references: [subjects.id],
  }),
}));

export const scheduleSlotsRelations = relations(scheduleSlots, ({ one }) => ({
  subject: one(subjects, {
    fields: [scheduleSlots.subjectId],
    references: [subjects.id],
  }),
}));

export const absencesRelations = relations(absences, ({ one }) => ({
  subject: one(subjects, {
    fields: [absences.subjectId],
    references: [subjects.id],
  }),
}));
