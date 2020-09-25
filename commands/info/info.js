const Discord =     require("discord.js");

//          -=- config files -=-        //
const botconfig =   require("../../botconfig.json");

//          -=- Data files -=-            //
const roles=  require("../../data/roles.json");
const colors = require("../../data/colors.json");

const prefix = botconfig.prefix;

module.exports.run = async (bot, message, args) => {
    const embed = new Discord.MessageEmbed()
    .setTitle(`I am the TeamToast Discord bot`)
    .setDescription(`I have been made by Daanisaanwezig to help moderate the server, but also to host event and hand out roles.`)
    .addField(`Prefix`, `My current prefix is set to \`${prefix}\``)

    message.channel.send(embed);
}


module.exports.config = {
    name: "info",
    aliases: ["inf"],
    usage: `${prefix}info`,
    description: "Get information about the bot",
    accessableby: "Members"
}