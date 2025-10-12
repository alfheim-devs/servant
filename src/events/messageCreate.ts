import { type ArgsOf, Client, Discord, On } from "discordx";
import { container } from "tsyringe";
import { UsersRepository } from "../repositories/UsersRepository.js";

@Discord()
export default class MessageCreateEvent {
    protected usersRepository: UsersRepository;

    constructor() {
        this.usersRepository = container.resolve(UsersRepository);
    }

    @On({ event: "messageCreate" })
    async onMessage([message]: ArgsOf<"messageCreate">, _client: Client) {}
}
