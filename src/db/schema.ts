import { pgTable, text, integer } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
    id: text().primaryKey().unique(),
    xp: integer().notNull(),
    bumps: integer().notNull(),
});

export type User = typeof usersTable.$inferSelect;
export type NewUser = typeof usersTable.$inferInsert;
