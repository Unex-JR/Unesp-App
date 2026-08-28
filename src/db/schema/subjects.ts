import { integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { semesters } from "./semesters";
import { users } from "./users";

export const subjects = sqliteTable("subjects", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id")
    .references(() => users.id)
    .notNull(),
  semesterId: integer("semester_id")
    .references(() => semesters.id)
    .notNull(),
  name: text("name").notNull(),
  professor: text("professor").notNull(),
  maxAbsencePercent: integer("max_absence_percent").default(70),
  minPassingGrade: real("min_passing_grade").default(5),
  externalId: integer("external_id"),
  source: text("source").$type<"manual" | "sisgrad">().notNull(),
});
