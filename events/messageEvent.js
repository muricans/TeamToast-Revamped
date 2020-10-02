const Discord = require("discord.js")
const fs = require('fs');

//          -=- config files -=-      //

//          -=- data files -=-        //
const channels = require("../data/channels.json");
const roles = require("../data/roles.json");

//          -=- helper classes -=-        //

const badWords = [
    "idiot", "retard", "reetard", "rarded", "rarted"
]

const sql = require('../functions/MySQL');
const connection = sql.connect();

module.exports = {
    languageCheck: (bot, message, user) => {
        // if (message.member.roles.cache.has(r => r.id === roles.moderator)) {
        //     return;
        // }

        message.content.split(' ').forEach(word => {
            if (badWords.includes(word)) {
                message.delete();
                let warning;
                message.channel.send("Please watch your language!").then(msg => warning = msg)
                setTimeout(function () {
                    warning.delete()
                }, 10000);

                const logChannel = bot.channels.cache.find(channel => channel.id === channels.logChannel)
                const logEmbed = new Discord.MessageEmbed()
                    .setTitle("User warned for inappropriate language")
                    .setDescription(`${user} has been warned for cursing in ${message.channel}.`)
                    .addField("Message: ", `${message.content}`)
                    .addField("Blacklisted word:", `${word}`)
                    .setTimestamp(Date.now());
                logChannel.send(logEmbed)
            }
        });
    },
    privateMessage: async (bot, message, user) => {
        const suggestion = message.content;
        const sugChannel = await bot.channels.fetch(channels.suggestionsChannel);
        const sug = await sql.select(connection, "suggestions");
        if (sugChannel instanceof Discord.TextChannel) {
            const suggestEmbed = new Discord.MessageEmbed()
                .setTitle(`Suggestion #${Object.keys(sug).length + 1}`)
                .addField('Submitted by', message.author)
                .addField("Suggestion", suggestion)
                .setFooter("React with 📧 to reply to the suggestor")
                .setTimestamp(Date.now());
            sugChannel.send(suggestEmbed).then(async sent => {
                await sent.react('📧');
                sql.insert(connection, "suggestions", "suggestion_user_id, suggestion_message, suggestion_message_id",
                    `${message.author.id}, "${suggestion}", ${sent.id}`);
            });
        }
        user.send('Hey, thanks for sending your feedback to us! We will take a look at it as soon as possible!');
    },
    suggestionReply: async (bot, message, responding, r) => {
        bot.users.fetch(responding.suggestion.suggestion_user_id, true).then(user => {
            user.send(`You received a response from a moderator: ${message.content}`);
            r.splice(r.indexOf(responding), 1);
        });
        message.channel.send('Your response has been sent to the suggestor!');
    },
    messageEdit: (bot, oldMessage, newMessage, user) => {
        const editEmbed = new Discord.MessageEmbed()
            .setTitle("Message has been edited")
            .setDescription(`A message has been edited by ${user}`)
            .addField(`Old message:`, oldMessage.content)
            .addField(`New message:`, newMessage.content)
            .setTimestamp(Date.now())

        bot.channels.cache.find(c => c.id === channels.logChannel).send(editEmbed);
    }

}