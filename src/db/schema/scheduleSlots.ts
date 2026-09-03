import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { subjects } from "./subjects";

export const scheduleSlots = sqliteTable("schedule_slots", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  subjectId: integer("subject_id")
    .references(() => subjects.id)
    .notNull(),
  weekday: integer("weekday").notNull(),
  startTime: text("start_time").notNull(),
  endTime: text("end_time").notNull(),
  room: text("room").notNull(),
  cancelled: integer("cancelled", { mode: "boolean"}).default(false),
});
