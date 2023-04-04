import { connect, set } from 'mongoose';
import Guild from './models/Guild';
import type { InternationalizationContext } from '@sapphire/plugin-i18next';
import { Partials } from 'discord.js';
import { SapphireClient } from '@sapphire/framework';

export default class VidlikClient extends SapphireClient {
  public constructor() {
    super({
      intents: ['Guilds', 'GuildMembers', 'GuildMessages', 'GuildVoiceStates'],
      sweepers: { messages: { interval: 120, lifetime: 60 } },
      partials: [Partials.Channel, Partials.GuildMember, Partials.Message],
      i18n: {
        fetchLanguage: async (context: InternationalizationContext) => {
          if (context.interactionLocale) return context.interactionLocale;
          else if (context.interactionGuildLocale) return context.interactionGuildLocale;
          else if (!context.guild) return 'uk';

          const guild = await Guild.findOne({ guild_id: context.guild.id });
          if (!guild) return 'uk';

          return guild.language;
        },
      },
    });
  }

  public login() {
    this.connectDatabase();
    return super.login();
  }

  private connectDatabase() {
    set('strictQuery', true);
    connect((process.env.DATABASE_URL ??= '')).then(
      () => this.logger.info('[Database] MongoDB successfully connected.'),
      err => {
        throw err;
      },
    );
  }
}
