import '@sapphire/plugin-logger/register';
import '@sapphire/plugin-i18next/register';
import 'dotenv/config';
import VidlikClient from '#lib/VidlikClient';

const client = new VidlikClient();

void (async () => {
  await client.login().catch((error: Error) => client.logger.fatal(error));
})();
