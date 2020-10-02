const Discord = require("discord.js");

//          -=- config files -=-        //
const botconfig = require("./botconfig.json");

//          -=- Packages -=-            //
const fs = require('fs');
const date = require('date-and-time');

//          -=- Events -=-            //
const messageEvent = require("./events/messageEvent");

//          -=- Data files -=-            //
const roles = require("./data/roles.json");
const channels = require('./data/channels.json');

const bot = new Discord.Client({
    disableEveryone: false
}); //create a new client that is the bot


const sql = require('./functions/MySQL');
const connection = sql.connect();

/* Log that the bot is online and set it's status */
bot.on("ready", async () => {
    let now = date.format(new Date(), 'YYYY/MM/DD HH:mm:ss');
    console.log(`[${now}] ${bot.user.username} is online`)
    bot.user.setActivity("TeamToast", {
        type: "WATCHING"
    });
    const suggestions = await sql.select(connection, "suggestions");
    suggestions.map(sug => {
        const channel = bot.channels.cache.get(channels.suggestionsChannel);
        if (channel instanceof Discord.TextChannel)
            channel.messages.fetch(sug.suggestion_message_id, true);
    });
});

bot.commands = new Discord.Collection(); // Collection for all commands
bot.aliases = new Discord.Collection(); // Collection for all aliases of every command


/* Create a list of all the subfolders that our commands will be in*/
const modules = ['moderating', 'info', 'utility'];

const responding = [];

/* Command getter */
modules.forEach(c => {
    fs.readdir(`./commands/${c}`, (err, files) => { //get all files in the "commands" folder

        if (err) console.log(err) //if there is an error, log it in the console

        let jsfile = files.filter(f => f.split(".").pop() === "js") //filer all the files to only get the javascript files
        if (jsfile.length <= 0) { //if there are no files found log in the console that no files (containing commands) have been found
            return console.log("[LOG] Couldn't find commands!");
        }

        jsfile.forEach((f, i) => { //Get all the javascript files and load them in so that their commands can be used
            let pull = require(`./commands/${c}/${f}`);
            bot.commands.set(pull.config.name, pull);
            pull.config.aliases.forEach(alias => {
                bot.aliases.set(alias, pull.config.name)
            });

        });

    });

});

/* CommandFile excecutor */
bot.on("message", async message => //if the bot sees a message (this can be in any text channel the bot has access to) do...
    {

        if (message.author.bot) {
            return;
        }

        if (message.channel.type === "dm") {
            if (responding.find(r => r.responding === message.author.id)) {
                messageEvent.suggestionReply(bot, message, responding.find(r => r.responding === message.author.id), responding);
            } else {
                messageEvent.privateMessage(bot, message, message.author)
                // Suggestions
                // bot dms
            }
        }

        let prefix = botconfig.prefix; //create a variable called prefix and assign the bots prefix to it

        let messageArray = message.content.split(" ") //split the message that has been send into parts
        let cmd = messageArray[0].toLowerCase(); //get the first part and name it "cmd"
        let args = messageArray.slice(1); //get the message array minus the first index to remove the command from it

        if (message.content.startsWith(prefix) && message.author != bot) {
            let commandfile = bot.commands.get(cmd.slice(prefix.length)) || bot.commands.get(bot.aliases.get(cmd.slice(prefix.length))) //check if there is a command with the name that comes after the prefix, if so the code below will run the code in the file that corresponds to that command
            if (commandfile) commandfile.run(bot, message, args)
            else if (!commandfile) message.channel.send(`I am not able to find that command. Use "${prefix}help" to get a list of all commands.`)
        } else {
            messageEvent.languageCheck(bot, message, message.author)
        }

    });

bot.on('messageUpdate', (oldMessage, newMessage) => {
    if (newMessage.author.bot) {
        return;
    }
    if (oldMessage.content != newMessage.content) {
        messageEvent.messageEdit(bot, oldMessage, newMessage, newMessage.author);
    }
});

bot.on('messageReactionAdd', async (reaction, user) => {
    if (user.bot) return;
    const {
        message,
        emoji,
        users
    } = reaction;
    if (emoji.name === '📧') {
        const suggestions = await sql.select(connection, 'suggestions');
        const suggestionId = suggestions.find(sug => sug.suggestion_message_id === message.id);
        if (suggestionId) {
            users.remove(user);
            user.send('Respond to the suggestion: ');
            responding.push({
                responding: user.id,
                suggestion: suggestionId
            });
        }
    }
});

/* Log the bot in by using its token */
bot.login(botconfig.token);