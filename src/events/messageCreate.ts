import { type ArgsOf, Client, Discord, On } from "discordx";
import { container } from "tsyringe";
import { Bump } from "../services/Bump.js";
import { Database } from "../services/Database.js";

@Discord()
export default class MessageCreateEvent {
    bumpService: Bump;
    database: Database;

    constructor() {
        this.bumpService = container.resolve(Bump);
        this.database = container.resolve(Database);
    }

    @On({ event: "messageCreate" })
    async onMessage([message]: ArgsOf<"messageCreate">, _client: Client) {
        void this.bumpService.handleMessageCreate(message);
    }
}
