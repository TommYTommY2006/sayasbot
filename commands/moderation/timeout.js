const { Client, Interaction, ApplicationCommandOptionType, Application, ApplicationCommand, PermissionFlagsBits, PermissionsBitField } = require("discord.js");
const ms = require('ms');

module.exports = {
    /**
     * 
     * @param {Client} client 
     * @param {Interaction} interaction 
     */

    callback: async (client, interaction) => {
        const mentionable = interaction.options.get('target-user').value;
        const duration = interaction.options.get('duration').value;
        const reason = interaction.options.get('reason')?.value || "No reason provided";

        //await interaction.deferReply();

        const targetUser = await interaction.guild.members.fetch(mentionable);
        if (!targetUser) {
            await interaction.editReply("That user doesn't exist in this server.");
            return;
        }

        if (targetUser.user.bot) {
            await Interaction.editReply("I can't timeout a bot you dumbass.");
            return;
        }

        const msDuration = ms(duration);
        if (isNaN(msDuration)) {
            await interaction.editReply("Please provide an actual timeout duration u moron.");
            return;
        }

        if (msDuration < 5000 || msDuration > 2.419e9) {
            await interaction.editReply("Timeout duration cannot be less than 5 seconds or more than 28 days smh.");
            return;
        }

        if (targetUser.id === interaction.guild.ownerId) {
            await interaction.editReply("You can't ban that user because they're the server owner you silly");
            return;
        }

        const targetUserRolePosition = targetUser.roles.highest.position; // highest role of target user
        const requestUserRolePosition = interaction.member.roles.highest.position; // highest role of user running command
        const botRolePosition = interaction.guild.members.me.roles.highest.position; // highest role of bot

        console.log(`${targetUserRolePosition} ${requestUserRolePosition} ${botRolePosition}`)

        if (targetUserRolePosition >= requestUserRolePosition) {
            await interaction.editReply("You can't timeout that user because they have the same/higher role than you. Silly goose.");
            return;
        }

        if (targetUserRolePosition >= botRolePosition) {
            await interaction.editReply("I can't timeout that user because they have the same/higher role as me.");
            return;
        } 

        if (!(interaction.member.permissions.has(PermissionsBitField.Flags.ModerateMembers))) {
            await interaction.editReply("Not enough permissions... try pinging the server owner!");
            return;
        }

        // Timeout the user
        try {
            const { default: prettyMs } = await import('pretty-ms');

            if (targetUser.isCommunicationDisabled()) {
                await targetUser.timeout(msDuration, reason);
                await interaction.editReply(`${targetUser}'s timeout has been updated to ${prettyMs(msDuration, { verbose: true })}.\nThis was done because: ${reason}`);
                return;
            }

            await targetUser.timeout(msDuration, reason);
            await interaction.editReply(`${targetUser} was timed out for ${prettyMs(msDuration, { verbose: true })}.\nThis was done because: ${reason}`);
        } catch (error) {
            console.log(`There was an error when timing out: ${error}`);
        }
    },

    name: 'timeout',
    description: 'If a user needs to be put in the timeout corner',
    options: [
        {
            name: 'target-user',
            description: 'The user to be sent to the timeout corner',
            type: ApplicationCommandOptionType.Mentionable,
            required: true,
        },
        {
            name: 'duration',
            description: 'How long this user needs to be put in the timeout corner for (30m, 1h, 1d)',
            type: ApplicationCommandOptionType.String,
            required: true,
        },
        {
            name: 'reason',
            description: 'The reason why this user is being sent to the timeout corner',
            type: ApplicationCommandOptionType.String,
        },
    ],
    permissionsRequired: [PermissionFlagsBits.ModerateMembers],
    botPermissions: [PermissionFlagsBits.ModerateMembers],
}