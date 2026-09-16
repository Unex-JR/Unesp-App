import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { courses } from "./courses";

export const absences = sqliteTable("absences", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  subjectId: integer("subject_id")
    .references(() => courses.id)
    .notNull(),
  date: text("date").notNull(),
  count: integer("count").notNull(),
});
