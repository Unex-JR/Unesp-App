import { integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { subjects } from "./subjects";

export const assessments = sqliteTable("assessments", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  subjectId: integer("subject_id")
    .references(() => subjects.id)
    .notNull(),
  name: text("name").notNull(),
  weight: real("weight").default(1).notNull(),
  grade: real("grade"),
  maxGrade: real("max_grade").default(10),
  date: text("date"),
});
