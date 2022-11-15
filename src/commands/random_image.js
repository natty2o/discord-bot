
const Discord = require('discord.js');

//------------------------------------------------------------//

module.exports = {
    data: {
        name: 'random_image',
        type: Discord.ApplicationCommandType.ChatInput,
        description: 'Random Image',
    },
    runner: async (interaction) => {
        await interaction.reply({
            content: `https://picsum.photos/1920/1080.jpg?v=${Date.now()}`,
        });
    },
};
