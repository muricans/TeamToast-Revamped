const Discord =     require("discord.js");

//          -=- config files -=-        //
const botconfig =   require("../../botconfig.json");

//          -=- Data files -=-            //
const roles=  require("../../data/roles.json");
const colors = require("../../data/colors.json");

const prefix = botconfig.prefix;

module.exports.run = async (bot, message, args) => {
    if (!args[0]) {
        const embed = new Discord.MessageEmbed()
        .setTitle(`Hey there, how can I help you?`)
        .setDescription(`Here are some commands I know:

        **${prefix}help [command]** *Get more detailed information about a command*
        **${prefix}info** *Get some general information about me*
        **${prefix}role <role name>** *Get a role for a specific game*`)
        .setFooter(`Please not that <> has to be filled in, and [] can be included as a optional argument.`)

        message.channel.send(embed);
    }
}


module.exports.config = {
    name: "help",
    aliases: ["?"],
    usage: `${prefix}help`,
    description: "Get a list of all commands",
    accessableby: "Members"
}