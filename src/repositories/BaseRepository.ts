import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { container } from "tsyringe";

export type DrizzleConnection = NodePgDatabase<Record<string, never>> & {
    $client: Pool;
};

export class BaseRepository {
    protected drizzle: DrizzleConnection;

    constructor() {
        this.drizzle = container.resolve("drizzleConnection");
    }
}
