import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
    out: "./drizzle",
    schema: "./src/db/schema.ts",
    dialect: "sqlite",
    dbCredentials: {
        url:
            process.env.NODE_ENV === "test"
                ? ":memory:"
                : process.env.DB_FILE_NAME!,
    },
});
