import { CacheType, CommandInteraction, EmbedBuilder } from 'discord.js';

export function toQRCodeEmbed(interaction: CommandInteraction<CacheType>, qrCodeFileName: string) {
	return new EmbedBuilder()
		.setColor('Random')
		.setTitle(interaction.client.user.username)
		.setAuthor({ name: interaction.client.user.username, iconURL: interaction.client.user.displayAvatarURL({ extension: 'png' }) })
		.setDescription('Scan the QR Code below to access the content.')
		.setThumbnail(`attachment://${qrCodeFileName}`)
		.setImage(`attachment://${qrCodeFileName}`)
		.setTimestamp()
}