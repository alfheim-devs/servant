import { container, singleton } from "tsyringe";
import { Embed, Message } from "discord.js";
import { UsersRepository } from "../repositories/UsersRepository.js";

const DISBOARD_BOT_ID = process.env.DISBOARD_BOT_ID || "";
const BUMP_ROLE_ID = process.env.BUMP_ROLE_ID || "";
const TWO_HOURS = 120 * 60 * 1000;

@singleton()
export class Bump {
    protected usersRepository: UsersRepository;

    constructor() {
        this.usersRepository = container.resolve(UsersRepository);
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
            const channel = message.channel;

            if (!channel.isSendable()) return;

            const user = (
                await this.usersRepository.getOrCreate({
                    id: userId,
                    bumps: 0,
                    xp: 0,
                })
            )[0];

            if (!user) return;

            const result = await this.usersRepository.incrementBumps(user);

            if (!result[0]) return;

            const bumps = result[0].bumps;
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

    timeout(milliseconds: number) {
        return new Promise((resolve) => setTimeout(resolve, milliseconds));
    }
}
