import "reflect-metadata";
import "dotenv/config";
import { afterEach, beforeEach, describe, it } from "node:test";
import { usersTable, User } from "../db/schema";
import { DrizzleConnection } from "../repositories/BaseRepository";
import { UsersRepository } from "../repositories/UsersRepository";
import { migrate } from "drizzle-orm/libsql/migrator";
import { drizzle } from "drizzle-orm/libsql";
import { container } from "tsyringe";
import assert from "node:assert";

const DATABASE_URL =
    process.env.NODE_ENV! === "test" ? ":memory:" : process.env.DB_FILE_NAME!;

const db = drizzle(DATABASE_URL, { logger: true });

async function startDatabase() {
    container.register<DrizzleConnection>("drizzleConnection", {
        useValue: db,
    });

    container.register<UsersRepository>(UsersRepository, {
        useValue: new UsersRepository(usersTable),
    });

    await migrate(db, { migrationsFolder: "./drizzle/" });
}

async function resetDatabase() {
    await db.run(
        "PRAGMA foreign_keys = OFF; DELETE FROM `users_table`; PRAGMA foreign_keys = ON;",
    );
}

beforeEach(startDatabase);
afterEach(resetDatabase);

describe("create user and find by id", () => {
    const user: User = {
        id: "123456",
        xp: 100,
        bumps: 10,
    };

    it("create user", async () => {
        const repo: UsersRepository = container.resolve(UsersRepository);
        const results = await repo.create(user);
        assert.deepEqual(results[0], user);
    });

    it("find user by id", async () => {
        const repo: UsersRepository = container.resolve(UsersRepository);
        const results = await repo.findById(user.id);
        assert.deepEqual(results[0], user);
    });

    it("create already existing user", async () => {
        const repo: UsersRepository = container.resolve(UsersRepository);

        assert.rejects(async () => {
            await repo.create(user);
        });
    });

    it("find unexisting user", async () => {
        const repo: UsersRepository = container.resolve(UsersRepository);
        const results = await repo.findById("1234");
        assert.deepStrictEqual(results, []);
    });
});
