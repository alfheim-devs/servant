import { drizzle, NodePgDatabase } from "drizzle-orm/node-postgres";
import { singleton } from "tsyringe";
import { Pool } from "pg";
import { usersTable } from "../db/schema.js";
import { desc, eq } from "drizzle-orm";

export type DrizzleDatabase = NodePgDatabase<Record<string, never>> & {
    $client: Pool;
};

export type User = typeof usersTable.$inferInsert;

@singleton()
export class Database {
    private drizzle: DrizzleDatabase;

    constructor(connectionString: string) {
        console.log("Database Service initiated!");
        this.drizzle = drizzle(connectionString);
    }

    check() {
        this.drizzle.execute("SELECT 1");
    }

    async createUser(userId: string) {
        const newUser: User = {
            id: userId,
            xp: 0,
            bumps: 0,
        };

        await this.drizzle.insert(usersTable).values(newUser);
    }

    async getUserOrCreateOne(userId: string) {
        const user = await this.getUser(userId);

        if (!user) {
            void this.createUser(userId);
            return await this.getUser(userId);
        }

        return user;
    }

    async userAlreadyExists(userId: string): Promise<boolean> {
        const result = await this.getUser(userId);
        return result !== undefined;
    }

    async getUser(userId: string): Promise<User | undefined> {
        const result = await this.drizzle
            .select()
            .from(usersTable)
            .where(eq(usersTable.id, userId));
        return result.length > 0 ? result[0] : undefined;
    }

    async incrementUserBump(userId: string, newValue: number) {
        await this.drizzle
            .update(usersTable)
            .set({ bumps: newValue })
            .where(eq(usersTable.id, userId));
    }

    async getTop10BumpUsers(): Promise<User[]> {
        const result = await this.drizzle
            .select()
            .from(usersTable)
            .orderBy(desc(usersTable.bumps))
            .limit(10);
        return result;
    }
}
