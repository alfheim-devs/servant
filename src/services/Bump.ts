import { inject, singleton } from "tsyringe";
import { Database } from "./Database.js";
import { Embed, Message, TextChannel } from "discord.js";

const DISBOARD_BOT_ID = process.env.DISBOARD_BOT_ID || "";

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
            }
        }
    }
}
