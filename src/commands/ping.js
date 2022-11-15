
const Discord = require('discord.js');

//------------------------------------------------------------//

module.exports = {
    data: {
        name: 'ping',
        type: Discord.ApplicationCommandType.ChatInput,
        description: 'Meow Meows',
    },
    runner: async (interaction) => {
        await interaction.reply({
            content: 'pong',
        });
    },
};
