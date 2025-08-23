/*
  Comando temporário de finalização do cliente
*/
import { Discord, Slash } from "discordx";
import { Category } from "@discordx/utilities";
import { CommandInteraction } from "discord.js";

@Discord()
@Category("Administrator")
export default class ShutdownCommand {
    @Slash({
        name: "shutdown",
        description: "Desligar bot pelo cliente {owner}",
    })
    async shutdown(interaction: CommandInteraction): Promise<void> {
        if (interaction.member?.user.id != process.env.OWNER_ID) return;
        await interaction.reply({ content: `Encerrando o bot.` });
        await interaction.client.destroy().catch((err) => console.log(err));
    }
}
