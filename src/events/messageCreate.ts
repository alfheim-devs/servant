import { type ArgsOf, Client, Discord, On } from "discordx";
import { container } from "tsyringe";
import { Bump } from "../services/Bump.js";
import { UsersRepository } from "../repositories/UsersRepository.js";

@Discord()
export default class MessageCreateEvent {
    protected bumpService: Bump;
    protected usersRepository: UsersRepository;

    constructor() {
        this.bumpService = container.resolve(Bump);
        this.usersRepository = container.resolve(UsersRepository);
    }

    @On({ event: "messageCreate" })
    async onMessage([message]: ArgsOf<"messageCreate">, _client: Client) {
        void this.bumpService.handleMessageCreate(message);
    }
}
