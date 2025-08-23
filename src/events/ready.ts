import { Client, Discord, Once, type ArgsOf } from "discordx";

@Discord()
export default class ReadyEvent {
    @Once({ event: "clientReady" })
    async onReady(_: ArgsOf<"ready">, client: Client) {
        await client.clearApplicationCommands();
        await client.initApplicationCommands();
        console.log(`${client.user?.tag} online!`);
    }
}
