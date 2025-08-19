import { Client, Discord, Once, type ArgsOf } from "discordx";

@Discord()
export default class ReadyEvent {
    @Once({ event: "ready" })
    async onReady(_: ArgsOf<"ready">, client: Client) {
        await client.initApplicationCommands();
        console.log(`${client.user?.tag} is ready!`);
    }
}
