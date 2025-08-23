/**
 * Servant, um bom simples de moderação
 * Nosso foco é entregar recursos e comandos personalizados, e isso reflete ao nosso código.
 *
 * Nosso servidor: /qTgfcN6ct7
 * Por: Alfheim Team
 */
import "reflect-metadata";
import "dotenv/config";
import { container } from "tsyringe";
import { Client, DIService, tsyringeDependencyRegistryEngine } from "discordx";
import { importx, dirname } from "@discordx/importer";
import { GatewayIntentBits } from "discord.js";
import { drizzle } from "drizzle-orm/node-postgres";

DIService.engine = tsyringeDependencyRegistryEngine.setInjector(container);

const GUILD_ID = process.env.GUILD_ID;
const BOT_TOKEN = process.env.BOT_TOKEN || "";
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
    botGuilds: GUILD_ID ? [GUILD_ID] : [],
});

async function main() {
    await importx(`${dirname(import.meta.url)}/{events,commands}/**/*.{ts,js}`);
    await client.login(BOT_TOKEN);
}

main();
