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

client.on('voiceStateUpdate', (oldState, newState) => {
    if (newState.channelId === '1109566626232721931') {
        newState.guild.channels.create("New Channel", {
            type: 'voice'
            parent: '1109565465879134349'
        }).then(vc => {
            newState.setChannel(vc);
        })
    }
})

client.login(process.env.TOKEN)