import { Category } from "@discordx/utilities";
import { CommandInteraction, MessageFlags } from "discord.js";
import { Discord, Slash, SlashGroup } from "discordx";
import { container } from "tsyringe";
import { UsersRepository } from "../../repositories/UsersRepository.js";
import { User } from "../../db/schema.js";

@Discord()
@Category("Information")
@SlashGroup({ name: "rank", description: "rank" })
@SlashGroup("rank")
export default class RankCommand {
    @Slash({
        name: "bumps",
        description: "Ranking de bumps",
    })
    async bumps(interaction: CommandInteraction): Promise<void> {
        const usersRepository = container.resolve(UsersRepository);
        const users = await usersRepository.getTop10Bumps();

        if (!users) return;

        await interaction.reply({
            content: this.buildBumpsRanking(users),
            flags: MessageFlags.Ephemeral,
        });
    }

    buildBumpsRanking(users: User[]) {
        const result = users.map(
            (user) => `- <@${user.id}>: **${user.bumps}** bumps\n`,
        );

        return result.join("");
    }
}
