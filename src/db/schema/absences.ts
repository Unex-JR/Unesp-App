import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { subjects } from "./subjects";

export const absences = sqliteTable("absences", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  subjectId: integer("subject_id")
    .references(() => subjects.id)
    .notNull(),
  date: text("date").notNull(),
  count: integer("count").notNull(),
});
