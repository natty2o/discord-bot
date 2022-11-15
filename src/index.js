
const fs = require('node:fs');
const path = require('node:path');

const Discord = require('discord.js');

const { Commander } = require('./common/commands.js');

//------------------------------------------------------------//

const discord_bot_token = process.env.DISCORD_BOT_TOKEN;

//------------------------------------------------------------//

const client = new Discord.Client({
    intents: [],
});

//------------------------------------------------------------//

client.on(Discord.Events.ClientReady, () => {
    console.log('Discord Bot logged in');
});

client.on(Discord.Events.InteractionCreate, async (interaction) => {
    console.log('Interaction received from Discord', interaction);

    if (interaction.isChatInputCommand()) {
        await Commander.handleCommandInteraction(interaction);
    }
})
//------------------------------------------------------------//

const client_commands_directory = path.join(process.cwd(), 'src', 'commands');
const client_command_files = fs.readdirSync(client_commands_directory).filter(file => file.endsWith('.js'));

for (const command_file_name of client_command_files) {
    const command_file_path = path.join(client_commands_directory, command_file_name);
    const command = require(command_file_path);
    
    Commander.register(command);
    
    console.log(`Loaded command: ${command.data.name}`);
}

//------------------------------------------------------------//

client.login(discord_bot_token);