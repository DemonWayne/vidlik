import { ApplyOptions } from '@sapphire/decorators';
import { Listener } from '@sapphire/framework';
import type VidlikClient from '#lib/VidlikClient';

@ApplyOptions<Listener.Options>({ name: 'ready', once: true })
export class ClientListener extends Listener {
  public override run(client: VidlikClient) {
    this.container.logger.info(`Bot ${client.user?.username} has started!`);
  }
}
