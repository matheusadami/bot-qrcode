import fs from 'fs'
import url from 'url'
import path from 'path'
import { Client, REST, Routes } from 'discord.js'

export default async function registerCommands(client: Client<boolean>, token: string, clientId: string, cb: (error?: Error | unknown) => void) {
	const commands: unknown[] = []

	const slashCommansPath = path.resolve('src', 'commands')
	const slashCommandsFiles = fs.readdirSync(slashCommansPath).filter(file => file.endsWith('.ts'))

	try {
		for (const file of slashCommandsFiles) {
			const filePath = path.resolve(slashCommansPath, file)
			const command = await import(url.pathToFileURL(filePath).href)
			
			if ('data' in command && 'execute' in command) {
				commands.push(command.data.toJSON())
				client.commands.set(command.data.name, command)			
				continue
			}

			throw new Error(`Missing data or execute in ${filePath}`)
		}

		console.info('Registering commands... 📝')

		const rest = new REST().setToken(token);
		await rest.put(Routes.applicationCommands(clientId), { body: commands });

		console.info('Successfully registered commands! ✅')
    
		return cb()
	} catch (error) {
		console.error('Error registering commands! ❌', error)
		return cb(error)
	}
}
