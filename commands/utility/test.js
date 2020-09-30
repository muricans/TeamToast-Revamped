const Discord =     require("discord.js");

//          -=- config files -=-        //
const botconfig =   require("../../botconfig.json");

//          -=- Data files -=-            //
const roles=  require("../../data/roles.json");
const permRoles = require("../../data/permRoles.json");
const colors = require("../../data/colors.json");

const convertTime = require("../../functions/convertTime.js");

const prefix = botconfig.prefix;

module.exports.run = async (bot, message, args) => {

    if (!message.member.roles.cache.find(r => r.id === permRoles.moderator)) return

    let time = convertTime.convert(args[0]);

    const embed = new Discord.MessageEmbed()
    .setTitle(`testing, ignore this`)
    .setDescription(time)
    .setTimestamp(time);
    message.channel.send(embed)
}


module.exports.config = {
    name: "testTime",
    aliases: ["tt"],
    usage: `${prefix}testtime <time>`,
    description: "Test time conversion",
    accessableby: "Moderator"
}