import fs, { WriteStream } from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import crypto from 'node:crypto'
import QRCode from 'qrcode'
import { QRCodeSizeEnum } from '@/core/enums';
import { CacheType, CommandInteraction, SlashCommandBuilder, AttachmentBuilder } from 'discord.js';
import { toEnumValue, toQRCodeEmbed } from '@/core/mappers';
import { DEFAULT_QRCODE_FILE_EXTENSION } from '@/core/consts'
import { InputOptions } from '@/core/types/generate/InputOptions'

export const data = new SlashCommandBuilder()
	.setName('generate')
	.setDescription('Generate a QR Code 🔑')
	.setNameLocalizations({
		'pt-BR': 'gerar',
		'en-US': 'generate'
	})
	.setDescriptionLocalizations({
		'pt-BR': 'Gera um QR Code 🔑',
		'en-US': 'Generate a QR Code 🔑'
	})
	.addStringOption(option =>
		option
			.setName('content')
			.setNameLocalizations({
				'pt-BR': 'conteúdo',
				'en-US': 'content'
			})
			.setDescription('QR Code content')
			.setDescriptionLocalizations({
				'pt-BR': 'Conteúdo do QR Code',
				'en-US': 'QR Code content'
			})
			.setRequired(true)
			.setMaxLength(255)
	)
	.addStringOption(option =>
		option
			.setName('size')
			.setNameLocalizations({
				'pt-BR': 'tamanho',
				'en-US': 'size'
			})
			.setDescription('QR Code size')
			.setDescriptionLocalizations({
				'pt-BR': 'Tamanho do QR Code',
				'en-US': 'QR Code size'
			})
			.setRequired(false)
			.addChoices(
				{ name: 'Small', value: 'small', name_localizations: { 'pt-BR': 'Pequeno', 'en-US': 'Small' } },
				{ name: 'Medium', value: 'medium', name_localizations: { 'pt-BR': 'Médio', 'en-US': 'Medium' } },
				{ name: 'Large', value: 'large', name_localizations: { 'pt-BR': 'Grande', 'en-US': 'Large' } }
			)
	)

export async function execute(interaction: CommandInteraction<CacheType>): Promise<void> {
	const fileName = `qrcode-${crypto.randomUUID()}.${DEFAULT_QRCODE_FILE_EXTENSION}`
	const filePath = path.join(os.tmpdir(), fileName)

	try {
		const inputOptions = getInputOptions(interaction)
		await writeQRCodeFile(inputOptions, filePath)

		const embed = toQRCodeEmbed(interaction, fileName)
		const attachment = await createEmbedAttachment(filePath)
		
		await interaction.reply({ embeds: [embed],  files: [attachment], ephemeral: true })
	} catch (error) {
		console.error(error)
		await interaction.reply({ content: 'There was an error while executing this command! Please, contact the developer! ❌', options: { ephemeral: true } });	
	} finally {
		fs.rmSync(filePath, { force: true })
	}
}

function getInputOptions (interaction: CommandInteraction<CacheType>): InputOptions {
	const content = interaction.options.get('content')?.value as string
	const size = toEnumValue(QRCodeSizeEnum, interaction.options.get('size')?.value as string) ?? QRCodeSizeEnum.medium
	return { content, size }
}

async function writeQRCodeFile (inputOptions: InputOptions, path: string): Promise<WriteStream> {
	const writableStream = fs.createWriteStream(path)
	await QRCode.toFileStream(writableStream, inputOptions.content, { width: inputOptions.size, errorCorrectionLevel: 'M' })
	return writableStream
}

async function createEmbedAttachment(path: string) {
	const readableStream = fs.createReadStream(path)
	return new AttachmentBuilder(readableStream)
}
