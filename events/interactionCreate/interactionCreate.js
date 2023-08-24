const { devs, guildId } = require('../../config.json');
const getLocalCommands = require('../../utils/getLocalCommands');

module.exports = async (client, interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const localCommands = getLocalCommands();

    try{
        await interaction.deferReply()
        const commandObject = localCommands.find(
            (cmd) => cmd.name === interaction.commandName
        );

        if (!commandObject) return;

        if (commandObject.devOnly) {
            if (!devs.includes(interaciton.member.id)) {
                interaction.editReply("Only devs can use this command.")
                return;
            }
        }

        if (commandObject.testOnly) {
            if (!(interaction.guild.id === guildId)) {
                interaction.editReply("This command can only be used in the test server.")
                return;
            }
        }

        if (commandObject.permissionsRequired?.length) {
            for (const permission of commandObject.permissionsRequired) {
                console.log('2a')
                if (!interaction.member.permissions.has(permission)) {
                    console.log('2b')
                    interaction.editReply("Not enough permissions")
                    break;
                }
            }
        }

        if (commandObject.botPermissions?.length) {
            for (const permission of commandObject.botPermissions) {
                const bot = interaction.guild.members.me;
                
                if (!bot.permissions.has(permission)) {
                    interaction.editReply("Not enough permissions")
                    break;
                }
            }
        }

        await commandObject.callback(client, interaction)

    } catch (error) {
        console.log(`There was an error running this command: ${error}`);
    }
};