const { Client, Interaction, ApplicationCommandOptionType, PermissionFlagsBits, PermissionOverwriteManager, SlashCommandBuilder, Permissions, PermissionsBitField } = require('discord.js');

module.exports = {
    
    /**
     * 
     * @param {Client} client 
     * @param {Interaction} interaction 
     */
    
    callback: async (client, interaction) => {
        const targetUserId = interaction.options.get('target-user').value;
        const reason = interaction.options.get('reason')?.value || "No reason provided";

        // await interaction.deferReply();

        const targetUser = await interaction.guild.members.fetch(targetUserId);

        if (!targetUser) {
            await interaction.editReply("That user doesn't exist in this server.");
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
            await interaction.editReply("You can't ban that user because they have the same/higher role than you. Silly goose.");
            return;
        }

        if (targetUserRolePosition >= botRolePosition) {
            await interaction.editReply("I can't ban that user because they have the same/higher role as me.");
            return;
        } 

        if (!(interaction.member.permissions.has(PermissionsBitField.Flags.BanMembers))) {
            await interaction.editReply("Not enough permissions... try pinging the server owner!");
            return;
        }

        //kick the target user
        try {
            await targetUser.kick(reason);
            await interaction.editReply(`User ${targetUser} was banned\nThey were banned for: ${reason}`);
        } catch (error) {
            console.log(`[WARNING] There was an error when banning: ${error}`)
        }
    },
    name: 'ban',
    description: 'bans slightly naughty people!!!',
    options: [
        {
            name: 'target-user',
            description: 'The user who has been naughty',
            type: ApplicationCommandOptionType.Mentionable,
            required: true,
        },
        {
            name: 'reason',
            description: 'The reason this naughty user is being banned',
            type: ApplicationCommandOptionType.String,
            required: false,
        }
    ],
    permissionsRequired: [PermissionFlagsBits.BanMembers],
    botPermissions: [PermissionFlagsBits.BanMembers]
}