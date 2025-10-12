import { sqliteTable, text, int } from "drizzle-orm/sqlite-core";

export const usersTable = sqliteTable("users", {
    id: text().primaryKey().unique(),
    xp: int().notNull(),
    bumps: int().notNull(),
});

export type User = typeof usersTable.$inferSelect;
export type NewUser = typeof usersTable.$inferInsert;
