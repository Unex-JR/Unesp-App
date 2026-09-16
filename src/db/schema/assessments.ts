import { integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { courses } from "./courses";

export const assessments = sqliteTable("assessments", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  subjectId: integer("subject_id")
    .references(() => courses.id)
    .notNull(),
  name: text("name").notNull(),
  weight: real("weight").default(1).notNull(),
  grade: real("grade"),
  maxGrade: real("max_grade").default(10),
  date: text("date"),
});
