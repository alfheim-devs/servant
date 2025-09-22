import { desc, eq, gt } from "drizzle-orm";
import { NewUser, User, usersTable } from "../db/schema.js";
import { BaseRepository } from "./BaseRepository.js";
import { singleton } from "tsyringe";

@singleton()
export class UsersRepository extends BaseRepository {
    async get(id: string): Promise<User[]> {
        return this.drizzle
            .select()
            .from(usersTable)
            .where(eq(usersTable.id, id));
    }

    async create(values: NewUser): Promise<User[]> {
        return this.drizzle.insert(usersTable).values(values).returning();
    }

    async getOrCreate(values: NewUser): Promise<User[]> {
        return this.get(values.id) ?? this.create(values);
    }

    async incrementBumps(user: User): Promise<User[]> {
        return this.drizzle
            .update(usersTable)
            .set({ bumps: user.bumps + 1 })
            .where(eq(usersTable.id, user.id))
            .returning();
    }

    async getTop10Bumps(): Promise<User[]> {
        return this.drizzle
            .select()
            .from(usersTable)
            .where(gt(usersTable.bumps, 0))
            .orderBy(desc(usersTable.bumps))
            .limit(10);
    }
}
