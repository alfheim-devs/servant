import { type Client } from "@libsql/client";
import { LibSQLDatabase } from "drizzle-orm/libsql";
import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { SQLiteTable, TableConfig } from "drizzle-orm/sqlite-core";
import { container } from "tsyringe";

export type DrizzleConnection = LibSQLDatabase<Record<string, never>> & {
    $client: Client;
};

export abstract class BaseRepository<TTable extends SQLiteTable<TableConfig>> {
    protected table: TTable;
    protected drizzle: DrizzleConnection;

    constructor(table: TTable) {
        this.table = table;
        this.drizzle = container.resolve("drizzleConnection");
    }

    async create(
        data: InferInsertModel<TTable>,
    ): Promise<InferSelectModel<TTable>[]> {
        throw new Error("Method not implemented.");
    }

    async findById(id: string): Promise<InferSelectModel<TTable>[]> {
        throw new Error("Method not implemented.");
    }
}
