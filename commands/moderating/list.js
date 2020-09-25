const Discord =     require("discord.js");

//          -=- config files -=-        //
const botconfig =   require("../../botconfig.json");

//          -=- Data files -=-            //
const roles=  require("../../data/roles.json");
const permRoles = require("../../data/permRoles.json")
const colors = require("../../data/colors.json");

const prefix = botconfig.prefix;

module.exports.run = async (bot, message, args) => {

    if (!message.member.roles.cache.find(r => r.id === permRoles.moderator))
    {
        return;
    }

    if (!args[0]) { return message.channel.send(`Please provide a role to get a list of.`); }

    if (args[0] == "none") {
        message.guild.members.cache.forEach(member => {
            console.log(member.roles.cache.size + " | " + member.id)
            if (member.roles.cache.size == 1) {
                const embed = new Discord.MessageEmbed()
                    .setTitle(`Member found without any roles`)
                    .setDescription(`${member}, ${member.id}`)
                message.channel.send(embed)
            }
        })
    }

    let role = message.guild.roles.cache.find(r => r.id === args[0]) || message.guild.roles.cache.find(r=> r.name === args[0]);

    if (!role) { role = message.guild.roles.cache.find(r => r.name === args[0]) }

    if (!role)
    {
        role = message.mentions.roles.first();

        if (!role)
        {
            message.channel.send("I am not able to find that role, are you sure it is a valid role?");
            return;
        }
    }

    message.guild.members.cache.forEach(member => {
        if (member.roles.cache.find(r=> r.id === role.id)) {
            const embed = new Discord.MessageEmbed()
                .setTitle(`Member found with the role ${role.name}`)
                .setDescription(`${member}, ${member.id}`)
            message.channel.send(embed)
        }
    });
}

module.exports.config = {
    name: "list",
    aliases: [],
    usage: `${prefix}list`,
    description: "Get a list of everyone with a specific role",
    accessableby: "Moderators"
}