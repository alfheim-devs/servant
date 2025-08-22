/*
  @Servant - A simple Alfheim moderation and resource bot.
  Our focus is only to provide resources for our personal use, and this is reflected in the code.

  Acess our server: /qTgfcN6ct7
  By: Alfheim Team 
*/
import "reflect-metadata";
import "dotenv/config";
import { container } from "tsyringe";
import { Client, DIService, tsyringeDependencyRegistryEngine } from "discordx";
import { importx, dirname } from "@discordx/importer";
import { GatewayIntentBits } from "discord.js";
import { drizzle } from "drizzle-orm/node-postgres";

DIService.engine = tsyringeDependencyRegistryEngine.setInjector(container);

const GuildID = process.env.GuildID;
const Token = process.env.Token || "";
const dbURL = process.env.dbURL || "";

const db = drizzle(dbURL);
container.registerInstance("database", db);

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
    silent: false,
    botGuilds: GuildID ? [GuildID] : [],
});

async function main() {
    await importx(`${dirname(import.meta.url)}/{events,commands}/**/*.{ts,js}`);
    await client.login(Token);
}

main();
