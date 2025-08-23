import { Discord, Slash, SlashOption } from "discordx";
import { Category } from "@discordx/utilities";
import {
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
        member: GuildMember | null,
        interaction: CommandInteraction,
    ): Promise<void> {
        if (!member)
            interaction.reply(`Seu avatar\n${interaction.user.avatarURL()}`);
        else
            interaction.reply(
                `Avatar de ${member}\n${member.user.avatarURL()}`,
            );
    }
}
