import { Discord, Slash, SlashOption } from "discordx";
import { Category } from "@discordx/utilities";
import {
    APIInteractionGuildMember,
    ApplicationCommandOptionType,
    CommandInteraction,
    GuildMember,
} from "discord.js";

@Discord()
@Category("Information")
export default class InfoCommand {
    @Slash({
        name: "perfil",
        description: "exibir informações de um usuário",
    })
    async information(
        @SlashOption({
            name: "member",
            description: "alvo para ver o comando",
            required: false,
            type: ApplicationCommandOptionType.Mentionable,
        })
        member: GuildMember | APIInteractionGuildMember | undefined,
        interaction: CommandInteraction,
    ): Promise<void> {
	if (!member) member = await interaction.guild?.members.fetch(interaction?.user.id);
	if (member instanceof GuildMember)
	    interaction.reply(`### Informações de ${member.user.username}\n\`ID\`: ${member?.id}\n\n\`Entrou em\`:\n${member?.joinedAt?.toLocaleDateString("pt-br")}\n\`Criou em\`:\n${member?.user.createdAt.toLocaleDateString("pt-br")}\n`);
	
    }
}
