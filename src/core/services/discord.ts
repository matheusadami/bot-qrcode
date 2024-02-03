import { Client, Collection, Events, GatewayIntentBits } from 'discord.js';
import { handlerCommand } from '@core/app/handlers/command';

const client = new Client({ intents: [GatewayIntentBits.Guilds]  })
client.commands = new Collection();

client.once(Events.ClientReady, () => {
	console.info('QR Code Bot is ready! 🤖')
})

client.on(Events.InteractionCreate, handlerCommand)

export { client }