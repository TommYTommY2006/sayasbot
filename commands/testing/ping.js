const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('PINGPINGPINGPINGPINGPINGPING'),
    async execute(interaction) {
        // interaction.guild is the object representing the Guild in which the command was run
        const sent = await interaction.reply({ content: `pinging...`, fetchReply: true });
        interaction.editReply(`Roundtrip latency: ${sent.createdTimestamp - interaction.createdTimestamp}ms`);
    },
};