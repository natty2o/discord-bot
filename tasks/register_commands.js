
const fs = require('node:fs');
const path = require('node:path');

const Discord = require('discord.js');
const DiscordRest = require('@discordjs/rest');

//------------------------------------------------------------//

const discord_bot_id = process.env.DISCORD_BOT_ID;
const discord_bot_token = process.env.DISCORD_BOT_TOKEN;

//------------------------------------------------------------//

const command_files_path = path.join(process.cwd(), 'src', 'commands');
const command_files = fs.readdirSync(command_files_path).filter(file => file.endsWith('.js'));

//------------------------------------------------------------//

const rest = new DiscordRest.REST({ version: '10' }).setToken(discord_bot_token);

//------------------------------------------------------------//

async function main() {
    const api_commands = [];

    for (const command_file_name of command_files) {
        const command_file_path = path.join(command_files_path, command_file_name);

        const command = require(command_file_path);

        api_commands.push(command.data);
    }

    try {
        console.log('Registering Commands...');

        const application_commands_route = Discord.Routes.applicationCommands(discord_bot_id);
        await rest.put(application_commands_route, { body: api_commands }); 
    } catch (error) {
        console.trace('failed to register commands', error);
    }
}

main();