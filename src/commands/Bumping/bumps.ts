import { Category } from "@discordx/utilities";
import {
    APIInteractionGuildMember,
    ApplicationCommandOptionType,
    CommandInteraction,
    GuildMember,
} from "discord.js";
import { Discord, Slash, SlashOption } from "discordx";
import { container } from "tsyringe";
import { UsersRepository } from "../../repositories/UsersRepository.js";

@Discord()
@Category("Bumping")
export default class BumpsCommand {
    @Slash({
        name: "bumps",
        description: "View how much bumps an user gave",
    })
    async bumps(
        @SlashOption({
            name: "member",
            description: "Member you want to see bumps",
            required: false,
            type: ApplicationCommandOptionType.User,
        })
        member: GuildMember | APIInteractionGuildMember | null,
        interaction: CommandInteraction,
    ): Promise<void> {
        if (!interaction.guild) return;

        member ??= interaction.member;
        const channel = interaction.channel;

        if (!member) return;
        if (!channel?.isSendable()) return;

        const usersRepository = container.resolve(UsersRepository);

        const user = (
            await usersRepository.getOrCreate({
                id: member.user.id,
                bumps: 0,
                xp: 0,
            })
        )[0];

        await interaction.reply(
            user
                ? `O usuário \`${member.user.username}\` tem ${user.bumps} bumps!`
                : `Falha ao obter dados do usuário!`,
        );
    }
}
