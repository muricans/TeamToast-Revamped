const Discord =     require("discord.js");

//          -=- config files -=-        //
const botconfig =   require("../../botconfig.json");

//          -=- Data files -=-            //
const roles=  require("../../data/roles.json");
const permRoles = require("../../data/permRoles.json");
const colors = require("../../data/colors.json");

const prefix = botconfig.prefix;

module.exports.run = async (bot, message, args) => {

    if (!message.member.roles.cache.find(r => r.id === permRoles.moderator)) return

    const embed = new Discord.MessageEmbed()
    .setTitle(`The rules`)
    .setDescription(`these rules are only here to act as guidelines, proper thinking and behaviour should always be applied when posting a message or talking in a voice channel.
    
    Here are the general rules:
    1. Do not judge or insult someone
    2. Sending a NSFW or rasist meme or joke is fine, just make sure to send it as a spoiler (*for text send the message like this: \`||content||\` for a image you should press the 'mark as spoiler button'*)
    3. Expressing your opinions is fine, but do not bring it as the only correct opinion

    Note:
    If your message gets automatically deleted it means that you used a word in it that is on the blacklist, please do not spam that message because doing so can and will result in a temporary mute.
    `)
    .setFooter(`The rules are bound to change whenever needed`)
    .setTimestamp(Date.now());

    message.channel.send(embed);
}


module.exports.config = {
    name: "rules",
    aliases: [""],
    usage: `${prefix}rules`,
    description: "Print out a fancy list of all the rules",
    accessableby: "Moderator"
}