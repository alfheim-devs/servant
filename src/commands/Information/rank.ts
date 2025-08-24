import { Category } from "@discordx/utilities";
import { CommandInteraction, MessageFlags } from "discord.js";
import { Discord, Slash, SlashGroup } from "discordx";
import { container } from "tsyringe";
import { Database, User } from "../../services/Database.js";

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
        const database = container.resolve(Database);
        const users = await database.getTop10BumpUsers();
        const response = this.buildBumpsRanking(users);

        await interaction.reply({
            content: response,
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
