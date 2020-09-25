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

    const time = 60 * 1000;

    let title = args.join(" ");

    message.channel.send(`The title has been set to \`${title}\`, please give a announcement description.`)

    message.channel.awaitMessages(m => m.author.id == message.author.id, {max: 1, time: time}).then(collected => {
        const embed = new Discord.MessageEmbed()
        .setTitle(title)
        .setDescription(collected.first().content)
        .setFooter(`-TeamToast staff team`)

        console.log(collected.first().content)

        message.channel.send(embed)
    }).catch ((err) => {
        console.log(err)
        message.channel.send(`No reaction recieved within ${time/1000} seconds, aborting announcement.`)
    })
}


module.exports.config = {
    name: "announce",
    aliases: ["ann"],
    usage: `${prefix}announce <announcement title>`,
    description: "Make a announcement",
    accessableby: "Moderator"
}