const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
            .setName('test')
            .setDescription('test 123'),
        async execute(interaction) {
            // just replies with a basic test test test to make sure slash commands are working
            await interaction.reply(`test test test`)
        },
    };