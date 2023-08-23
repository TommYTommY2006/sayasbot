const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    name: 'ping',
    description: 'pong!',
    // devOnly: Boolean,
    // testOnly: Boolean,
    // options: Object[],

    callback: async (client, interaction) => {
        await interaction.deferReply();

        const reply = await interaction.fetchReply();

        const ping = reply.createdTimestamp - interaction.createdTimestamp;

        interaction.editReply(`Client ping is ${ping}ms. Websocket ping is ${client.ws.ping}ms. (nerd)`)
    }
};