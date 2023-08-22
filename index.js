const { Client, GatewayIntentBits } = require('discord.js')
require('dotenv/config')

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessageReactions,
    ],
})

client.on('ready', () => {
    console.log('Ready, set, go!')
})

client.on('messageCreate', message => {
    if (message.content === 'ur mom') {
        message.reply('E')
    }
})

client.on('messageCreate', message => {
    if (message.content === 'kys') {
        message.reply('nuh uh')
    }
})

client.on('messageCreate', message => {
    if (message.content === 'why not') {
        message.reply('yeah why not Lou')
    }
})

client.login(process.env.TOKEN)