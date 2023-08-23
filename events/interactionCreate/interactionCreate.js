const { devs, guildId } = require('../../config.json');
const getLocalCommands = require('../../utils/getLocalCommands');

module.exports = async (client, interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const localCommands = getLocalCommands();

    try{
        const commandObject = localCommands.find(
            (cmd) => cmd.name === interaction.commandName
        );

        if (!commandObject) return;

        if (commandObject.devOnly) {
            if (!devs.includes(interaciton.member.id)) {
                interaction.reply({
                    content: `Only developers are allowed to use this command u dummy`,
                    ephemeral: true
                });
                return;
            }
        }

        if (commandObject.testOnly) {
            if (!(interaction.guild.id === guildId)) {
                interaction.reply({
                    content: `This command only works in the test server u stupid ahhh`,
                    ephemeral: true
                });
                return;
            }
        }

        if (commandObject.permissionsRequired?.length) {
            for (const permission of commandObject.permissionsRequired) {
                if (!interaction.member.permissions.has(permission)) {
                    interaction.reply({
                        content: 'Not enough permissions',
                        ephemeral: true
                    });
                    break;
                }
            }
        }

        if (commandObject.botPermissions?.length) {
            for (const permission of commandObject.botPermissions) {
                const bot = interaction.guild.members.me;

                if (!bot.permissions.has(permission)) {
                    interaction.reply({
                        content: 'I dont have enough permissions for that',
                        ephemeral: true
                    });
                    break;
                }
            }
        }

        await commandObject.callback(client, interaction)

    } catch (error) {
        console.log(`There was an error running this command: ${error}`);
    }
};