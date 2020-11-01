const Discord = require("discord.js");
const client = new Discord.Client();
const config = require('./config.json');

////////////////START CLIENT/////////////////

client.once("ready", () => {
    console.log("Ready");
});

////////////////WEBHOOK CODE/////////////////

// const embed = new Discord.MessageEmbed()
//     .setTitle("Select a Role")
//     .setDescription("PEKO")
//     .setColor("#dcd6f7")

// client.once("ready", async () => {
//     const channel = client.channels.cache.get(config.channel_id);
//     try {
//         const webhooks = await channel.fetchWebhooks();
//         const webhook = webhooks.first();

//         await webhook.send(null, {
//             // avatarURL: "https://cdn.discordapp.com/attachments/342550444947800065/770840177308073994/missionDesk.png",
//             embeds: [embed],
//         });
//     } catch (error) {
//         console.error("Error trying to send: ", error);
//     }
// });

////////////////MESSAGE CODE/////////////////

client.on('message', message => {
    //Assigns user to role, shortly deletes message after
    if (message.content.toLowerCase() === "academy student") {

        let userInput = message.content.toLowerCase();
        let role = message.guild.roles.cache.find(role => role.name.toLowerCase() === userInput);
        if(role) {
            if(message.member.roles.cache.has(role.id)) {
                message.reply("You are already in the academy.").then(message => {message.delete({ timeout: 5000 })})
                message.delete({timeout: 5000});
            } else {
                message.member.roles.add(role)
                message.reply("Welcome to the Academy").then(message => {message.delete({ timeout: 5000 })});
                message.delete({timeout: 5000});
            }
        }
    }

    //BOT REACTS WITH YOUSORO
    if (message.content.toLowerCase() === "yousoro") {
        const reactYousoro = message.guild.emojis.cache.find(emoji => emoji.name === "Yousoro7")
        message.react(reactYousoro);
    }

});

client.login(config.token);

//1.(DONE Bot can send webhook) Bot will display welcome webook w/ information regarding how to select a role
//2.(DONE functionality is to listen) Bot will listen for "role" user types
//3.(DONE) Bot will assign role that user types
//4.(DONE) Delete user message
//  a. delete bot message
//5. Promote users using substrings, keyword = "promote"
//  a. remove user's lower rank and update to higher rank ex: promote @user Genin
//