const { events } = require('discord.js');

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client) {
        console.log(`Ready, set, go! Logged in as ${client.user.tag}`);
    },
};