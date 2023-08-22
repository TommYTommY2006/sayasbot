const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
require('dotenv/config');
const fs = require('node:fs');
const path = require('node:path');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildVoiceStates,
    ],
})

client.commands = new Collection();

client.on('ready', () => {
    console.log('Ready, set, go!')
})

client.on('messageCreate', message => {
    if (message.content === 'ur mom') {
        message.reply('E')
    }
})

client.login(process.env.TOKEN)