import { eq } from "drizzle-orm";
import { NewUser, User, usersTable } from "../db/schema.js";
import { BaseRepository } from "./BaseRepository.js";
import { singleton } from "tsyringe";

@singleton()
export class UsersRepository extends BaseRepository<typeof usersTable> {
    async create(data: NewUser): Promise<User[]> {
        return this.drizzle.insert(this.table).values(data).returning();
    }

    async findById(id: string): Promise<User[]> {
        return this.drizzle
            .select()
            .from(usersTable)
            .where(eq(usersTable.id, id));
    }
}
