import { Interaction, CacheType } from 'discord.js';

export async function handlerCommand(interaction: Interaction<CacheType>): Promise<void> {
	if (!interaction.isChatInputCommand()) return
	try {
		const command = interaction.client.commands.get(interaction.commandName);
		if (!command) throw new Error(`Command ${interaction.commandName} not found!`);
		await command.execute(interaction);
	}
	catch (error) {
		console.error(error);
		await interaction.channel?.send({ content: 'There was an error while executing this command! Please, contact the developer! ❌', options: { ephemeral: true } });
	}
}
