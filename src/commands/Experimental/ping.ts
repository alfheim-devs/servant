import { Discord, Slash } from "discordx";
import { Category } from "@discordx/utilities";
import { CommandInteraction } from "discord.js";

@Discord()
@Category("Experimental")
export default class PingCommand {
    @Slash({
        name: "ping",
        description: "Apenas um teste rápido da interação",
    })
    async ping(interaction: CommandInteraction): Promise<void> {
        await interaction.reply({
            content: `Pong!`,
        });
    }
}
