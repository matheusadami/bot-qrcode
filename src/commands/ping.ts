import { CacheType, SlashCommandBuilder, CommandInteraction } from 'discord.js'

export const data = new SlashCommandBuilder()
	.setName('ping')
	.setDescription('Replies with Pong! 🏓')
	.setDescriptionLocalizations({
		'pt-BR': 'Responde com Pong! 🏓',
		'en-US': 'Replies with Pong! 🏓'
	})

export async function execute(interaction: CommandInteraction<CacheType>): Promise<void> {
	await interaction.reply('Pong! 🏓')
}