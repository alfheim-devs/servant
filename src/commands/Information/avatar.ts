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
export default class AvatarCommand {
    @Slash({
        name: "avatar",
        description: "Exibir o avatar de alguém",
    })
    async avatar(
        @SlashOption({
            name: "member",
            description: "alvo para ver o avatar",
            required: false,
            type: ApplicationCommandOptionType.Mentionable,
        })
        member: GuildMember | APIInteractionGuildMember | undefined,
        interaction: CommandInteraction,
    ): Promise<void> {
	if (!member) member = await interaction.guild?.members.fetch(interaction?.user.id);
	if (member instanceof GuildMember)
	    interaction.reply(`${member?.avatarURL()}`);
    }
}
