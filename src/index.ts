import "reflect-metadata";
import "dotenv/config";
import { container } from "tsyringe";
import { Client, DIService, tsyringeDependencyRegistryEngine } from "discordx";
import { importx, dirname } from "@discordx/importer";
import { GatewayIntentBits } from "discord.js";
import { drizzle } from "drizzle-orm/node-postgres";

DIService.engine = tsyringeDependencyRegistryEngine.setInjector(container);

const DISCORD_GUILD_ID = process.env.DISCORD_GUILD_ID;
const DISCORD_TOKEN = process.env.DISCORD_TOKEN || "";
const DATABASE_URL = process.env.DATABASE_URL || "";

const db = drizzle(DATABASE_URL);
container.registerInstance("database", db);

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
    silent: false,
    botGuilds: DISCORD_GUILD_ID ? [DISCORD_GUILD_ID] : [],
});

async function main() {
    await importx(`${dirname(import.meta.url)}/{events,commands}/**/*.{ts,js}`);
    await client.login(DISCORD_TOKEN);
}

main();
