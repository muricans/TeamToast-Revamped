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
    .setTitle(`Want to leave some feedback or do you have a suggestion?`)
    .setDescription(`If you wish to leave feedback you can do so by sending a message to me (<@654683062202007583>), this message can only be read by moderators and will not be shared with the outside world.
    It can also be used to report someone, but if it is urgent you should still try to directly contact a moderator if possible.`)
    .setFooter(`Ofcourse you can also still directly send feedback or suggestions to a moderator`)

    message.channel.send(embed);
}


module.exports.config = {
    name: "suggestions",
    aliases: ["suggestion"],
    usage: `${prefix}suggestions`,
    description: "Print out a fancy list of how to send feedbacl",
    accessableby: "Moderator"
}