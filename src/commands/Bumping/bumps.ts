import { Category } from "@discordx/utilities";
import {
    APIInteractionGuildMember,
    ApplicationCommandOptionType,
    CommandInteraction,
    GuildMember,
    TextChannel,
} from "discord.js";
import { Discord, Slash, SlashOption } from "discordx";
import { container } from "tsyringe";
import { Database } from "../../services/Database.js";

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

        if (channel instanceof TextChannel) {
            const database = container.resolve(Database);
            const result = await database.getUserOrCreateOne(
                member?.user.id || "",
            );

            await interaction.reply(
                result
                    ? `O usuário \`${member?.user.username}\` tem ${result?.bumps} bumps!`
                    : "Falha ao obter dados do usuário!",
            );
        }
    }
}
