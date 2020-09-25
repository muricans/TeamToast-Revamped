const Discord =         require("discord.js")
const fs =              require('fs');

//          -=- config files -=-      //

//          -=- data files -=-        //
const channels =        require("../data/channels.json");
const roles =           require("../data/roles.json");

//          -=- helper classes -=-        //

const badWords = [
    "idiot", "retard", "reetard", "rarded", "rarted"
]

module.exports = {
    languageCheck: (bot ,message, user) => {
        // if (message.member.roles.cache.has(r => r.id === roles.moderator)) {
        //     return;
        // }
        
        message.content.split(' ').forEach(word => {
            if (badWords.includes(word)) {
                message.delete();
                let warning;
                message.channel.send("Please watch your language!").then(msg => warning = msg)
                setTimeout(function () { warning.delete()}, 10000);
                
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
    privateMessage: (bot, message, user) => {
        const suggestionEmbed = new Discord.MessageEmbed()
            .setTitle(`Suggestion submitted by ${user.tag}`)
            .setDescription(message)
            .setFooter(`User id: ${user.id}`)
            .setTimestamp(Date.now())

        bot.channels.cache.find(c => c.id === channels.suggestionsChannel).send(suggestionEmbed);

        user.send("Hey, thanks for sending your feedback to us! We will take a look at it as soon as possible!")
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