import 'dotenv/config'
import { client } from '@core/services/discord'
import registerCommands from '@core/app/registerCommands'

const token = process.env.TOKEN as string
const clientId = process.env.CLIENT_ID as string

registerCommands(client, token, clientId, (error) => {
	if (error) return
	client.login(token)
})
