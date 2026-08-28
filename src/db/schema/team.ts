import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const team = sqliteTable("team", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  role: text("role").notNull(),
  instagramUrl: text("instagram_url").notNull(),
  linkedinUrl: text("linkedin_url").notNull(),
});
