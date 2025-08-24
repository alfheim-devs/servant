import { inject, singleton } from "tsyringe";
import { Database } from "./Database.js";
import { Embed, Message, TextChannel } from "discord.js";

const DISBOARD_BOT_ID = process.env.DISBOARD_BOT_ID || "";
const BUMP_ROLE_ID = process.env.BUMP_ROLE_ID || "";
const TWO_HOURS = 120 * 60 * 1000;

@singleton()
export class Bump {
    constructor(@inject(Database) private database: Database) {
        this.database.check();
        console.log("Bump Service loaded!");
    }

    bumpHasSucceeded(
        messageAuthorId: string,
        embed: Embed | undefined,
    ): boolean {
        return (
            (messageAuthorId === DISBOARD_BOT_ID &&
                embed?.description?.startsWith("Bump done!")) ||
            false
        );
    }

    async handleMessageCreate(message: Message): Promise<void> {
        if (this.bumpHasSucceeded(message.author.id, message.embeds[0])) {
            const userId = message.interactionMetadata?.user.id || "";
            const user = await this.database.getUserOrCreateOne(userId);
            const channel = message.channel;

            if (user && channel instanceof TextChannel) {
                const bumps = user?.bumps + 1;
                void this.database.incrementUserBump(userId, bumps);
                await message.react("👍");

                await channel.send(
                    `<@${user.id}>, você acabou de dar bump! Agora você tem ${bumps} bumps!`,
                );

                await this.timeout(TWO_HOURS);

                await channel.send(
                    `<@&${BUMP_ROLE_ID}>, o bump está pronto! Use o comando </bump:947088344167366698>`,
                );
            }
        }
    }

    timeout(milliseconds: number) {
        return new Promise((resolve) => setTimeout(resolve, milliseconds));
    }
}
