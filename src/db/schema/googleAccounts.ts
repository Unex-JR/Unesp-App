import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { users } from "./users";

export const googleAccounts = sqliteTable("google_accounts", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id")
    .references(() => users.id)
    .notNull(),
  accessToken: text("access_token").notNull(),
  refreshToken: text("refresh_token"),
  expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
  scope: text("scope").notNull(),
});
