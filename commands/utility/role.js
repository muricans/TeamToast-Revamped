const Discord =     require("discord.js");

//          -=- config files -=-        //
const botconfig =   require("../../botconfig.json");

//          -=- Data files -=-            //
const roles=  require("../../data/roles.json");
const colors = require("../../data/colors.json");
const permRoles = require("../../data/permRoles.json");
const channels = require("../../data/channels.json");

const prefix = botconfig.prefix;

module.exports.run = async (bot, message, args) => {

    let rolesList = [];
    for(let index in roles) {
        rolesList.push(`- ${index} <@&${roles[index]}>`);
    }
    
    if (!args[0]) {
        const embed = new Discord.MessageEmbed()
        .setTitle(`Hey, you forgot something!`)
        .setDescription(`Please make sure to include a role you would like to get. Keep in mind that you can not ping roles, if you need a lit of all roles type \`${prefix}role list\``)
        message.channel.send(embed);
    } else if (args[0] == "list") {
        if (message.member.roles.cache.find(r => r.id === permRoles.moderator)) {
            const embed = new Discord.MessageEmbed()
            .setTitle(`Here is a list of all currently available roles.`)
            .setDescription(`${rolesList.join("\n")}
            
            Example to obtain a role: \`${prefix}role minecraft\` to get the <@&${roles.minecraft}> role.`)
            message.channel.send(embed)
        }
    } else if (roles[args[0]] != null) {
        let role = message.guild.roles.cache.find(r => r.id ===roles[args[0]]);
        if (message.member.roles.cache.find(r => r.id === roles[args[0]])) {
            message.member.roles.remove(role);
            let notification;
            await message.channel.send("I removed the role!").then(msg => notification = msg);
            message.delete();
            setTimeout(function () { notification.delete()}, 5000);

            const logEmbed = new Discord.MessageEmbed()
            .setTitle("Role removed")
            .setDescription(`The role ${role} has been removed from ${message.member}`)
            .setTimestamp(Date.now());
            message.guild.channels.cache.find(c => c.id === channels.logChannel).send(logEmbed)
        } else {
            message.member.roles.add(role);
            let notification;
            await message.channel.send("I added the role!").then(msg => notification = msg);
            message.delete();
            setTimeout(function () { notification.delete()}, 5000);

            const logEmbed = new Discord.MessageEmbed()
            .setTitle("Role added")
            .setDescription(`The role ${role} has been added to ${message.member}`)
            .setTimestamp(Date.now());
            message.guild.channels.cache.find(c => c.id === channels.logChannel).send(logEmbed)
        }

    } else if (roles[args[0]] == null) {
        const embed = new Discord.MessageEmbed()
        .setTitle("Oh, something went wrong.")
        .setDescription("Hey there, I  do not recognize that role. Are you sure it exists?")
        .setFooter("Feel like there is a role missing? Please contact a moderator.")
        let notification;
        message.delete();
        message.channel.send(embed).then(msg => notification = msg);
        setTimeout(function() { notification.delete()}, 20000);
    }
}


module.exports.config = {
    name: "role",
    aliases: ["role"],
    usage: `${prefix}role`,
    description: "Get or remove a role",
    accessableby: "Members"
}