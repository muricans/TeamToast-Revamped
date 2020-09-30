const Discord =     require("discord.js");

//          -=- config files -=-        //
const botconfig =   require("../../botconfig.json");

//          -=- Data files -=-            //
const channels = require("../../data/channels.json");
const roles=  require("../../data/roles.json");
const permRoles = require("../../data/permRoles.json");
const colors = require("../../data/colors.json");

//          -=- Function files -=-            //
const sql = require("../../functions/MySQL.js");

const prefix = botconfig.prefix;

module.exports.run = async (bot, message, args) => {

    // suspend <user> <time> <reason>

    if (!message.member.roles.cache.find(r => r.id === permRoles.moderator)) return

    if (!args[0]) return message.channel.send(`Please provide a user to suspend`);

    let user;
    if (message.mentions.first()) {
        user = message.mentions.first();
    } else {
        user = message.guild.members.cache.find(member => member.id == args[0])
    }
    if (!user) return message.channel.send(`Please provide a valid user mention or id`);

    let connection = sql.connect();
    sql.insert(connection, "suspensions", "suspension_time, suspension_end, reason", `1, 1, "test suspension"`);

    const suspended = message.guild.roles.cache.find(role => role.id == roles.suspended)
    user.roles.add(suspended);
    // add the suspended role

    const reason = args.slice(2).join(" ");
    const logChannel = message.guild.channels.cache.find(channel => channel.id == channels.logChannel);
    const logEmbed = new Discord.MessageEmbed()
    .setTitle(`User has been suspended`)
    .setDescription(`${user} has been suspended per request of ${message.author}`)
    .addField(`Reason:`, `${reason}`)
    .setTimestamp(Date.now());

    logChannel.send(logEmbed);
    
}


module.exports.config = {
    name: "suspend",
    aliases: ["ann"],
    usage: `${prefix}suspend <time> <reason>`,
    description: "Suspend someone",
    accessableby: "Moderator"
}