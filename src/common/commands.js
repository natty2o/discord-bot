const Discord = require('discord.js');

//------------------------------------------------------------//

class Commander {
    static commands = new Discord.Collection();

    static register(command) {
        Commander.commands.set(command.data.name, command);
    }

    static async handleCommandInteraction(command_interaction) {
        const command = Commander.commands.find(
            command => command.data.name === command_interaction.commandName
        );

        if (!command) {
            console.warn('Command not found', command_interaction);
            return;
        }

        try {
            await command.runner(command_interaction);
        } catch (error) {
            console.trace('Error running command', command_interaction, error);
        }
    }
}

//------------------------------------------------------------//

module.exports = {
    Commander, 
};
