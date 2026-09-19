import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { courses } from "./courses";

export const scheduleSlots = sqliteTable("schedule_slots", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  courseId: integer("subject_id")
    .references(() => courses.id)
    .notNull(),
  weekday: integer("weekday").notNull(),
  startTime: text("start_time").notNull(),
  endTime: text("end_time").notNull(),
  room: text("room").notNull(),
  cancelled: integer("cancelled", { mode: "boolean" }).default(false),
});
