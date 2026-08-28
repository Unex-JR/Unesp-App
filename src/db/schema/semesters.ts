import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const semesters = sqliteTable("semesters", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  year: integer("year").notNull(),
  period: integer("period").notNull(), // 1 or 2
  startDate: text("start_date"),
  endDate: text("end_date"),
});
