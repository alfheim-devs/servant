import { Discord, Slash } from "discordx";
import { Category } from "@discordx/utilities";
import { CommandInteraction } from "discord.js";

@Discord()
@Category("Experimental")
export default class TestCommand {
    @Slash({
        name: "test",
        description: "Just a test command",
    })
    async test(interaction: CommandInteraction): Promise<void> {
        await interaction.reply({
            content: `This is a test!`,
        });
    }
}
