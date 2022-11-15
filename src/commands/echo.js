
const Discord = require('discord.js');

//------------------------------------------------------------//

module.exports = {
    data: {
        name: 'echo',
        type: Discord.ApplicationCommandType.ChatInput,
        description: 'Echo',
        options: [
            {
                type: Discord.ApplicationCommandOptionType.String,
                name: 'msg',
                description: 'because I have to',
                required: true,
            },
        ],
    },
    runner: async (interaction) => {
        const msg = interaction.options.getString('msg', true);

        await interaction.reply({
            content: `${interaction.user} says ${msg}`,
        });
    },
};
