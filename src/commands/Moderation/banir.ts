import { Discord, Slash, SlashOption } from "discordx";
import { Category } from "@discordx/utilities";
import {
    CommandInteraction,
    PermissionFlagsBits,
    GuildMember,
    ApplicationCommandOptionType,
} from "discord.js";

@Discord()
@Category("Moderation")
export default class BanCommand {
    @Slash({
        name: "banir",
        description: "banir um membro do servidor.",
    })
    async ban(
        @SlashOption({
            name: "member",
            description: "membro para banir",
            required: true,
            type: ApplicationCommandOptionType.Mentionable,
        })
        member: GuildMember | null,
        @SlashOption({
            name: "reason",
            description: "motivo para o banimento",
            required: false,
            type: ApplicationCommandOptionType.String,
        })
        reason: string,
        interaction: CommandInteraction,
    ) {
        if (!interaction.guild) return;
        const author = await interaction.guild?.members.fetch(
            interaction.user.id,
        );

        if (!member || member.id == interaction.user.id)
            return interaction.reply(
                `O membro mencionado não pode ser banido.`,
            );

        const memberRole = member?.roles.highest.position;
        if (!memberRole)
            return interaction.reply(
                `Não foi possível capturar a posição do cargo.`,
            );
        if (!author?.permissions.has(PermissionFlagsBits.BanMembers))
            return interaction.reply(
                `Você não tem permissão para banir um membro.`,
            );
        else if (
            !interaction.guild?.members.me?.permissions.has(
                PermissionFlagsBits.BanMembers,
            )
        )
            return interaction.reply(
                `Eu não tenho permissão de banir um membro.`,
            );
        else if (interaction.guild.ownerId == member.id)
            return interaction.reply(`Você não pode banir o dono do servidor.`);
        else if (
            interaction.guild?.members.me?.roles.highest.position <= memberRole
        )
            return interaction.reply(`Não posso banir alvos acima de mim.`);
        else if (
            author?.roles.highest.position <= member.roles.highest.position
        )
            return interaction.reply(`Não posso banir seu superior.`);

        member
            .ban({ reason: `${author.user.username} | ${reason}` })
            .catch((err) => {
                console.log(err);
                return interaction.reply(`Não foi possível banir ${member}`);
            });
        await interaction.reply(`Banido ${member} por *${reason}*.`);
    }
}
