const Discord = require("discord.js");
const client = new Discord.Client();
const config = require('./config.json');

////////////////START CLIENT/////////////////

client.once("ready", () => {
    console.log("Ready");
});

////////////////WEBHOOK CODE/////////////////

const webhook = new Discord.WebhookClient(config.webhook_id, config.webhook_token);

////////////////MESSAGE CODE/////////////////

client.on("message", message => {
    //Assigns user to role, shortly deletes message after
    if (message.content.toLowerCase() === "placeholder role") {

        let userInput = message.content.toLowerCase();
        let role = message.guild.roles.cache.find(role => role.name.toLowerCase() === userInput);
        if (role) {
            if (message.member.roles.cache.has(role.id)) {
                message.reply("You are already in the Placeholder role.").then(message => {message.delete({timeout: 5000})})
                message.delete({timeout: 5000});
            } else {
                message.member.roles.add(role)
                message.reply("Welcome to the Placeholder role!").then(message => {message.delete({timeout: 5000})});
                message.delete({timeout: 5000});
            }
        } else {
            console.log(err);
        }
    }
    //EMBED TEXT
    else if (message.content.toLowerCase() === "welcome") {

        //WEBHOOK CONTENT
        const embed = new Discord.MessageEmbed()
            .setTitle("Welcome")
            .setDescription("To add the Placeholder role, please type Placeholder")
            .setColor("#dcd6f7")
        
            
        //WEBHOOK DETAIL AND SEND FUNCTION
        webhook.send(null, {
            username: "roleBot",
            avatarURL: "https://cdn.discordapp.com/attachments/342550444947800065/770840177308073994/missionDesk.png",
            embeds: [embed]
        });
    
    }

});

client.login(config.token);

//1.(DONE) Bot can send webhook Bot will display welcome webook w/ information regarding how to select a role
//2.(DONE) functionality is to listen Bot will listen for "role" user types
//3.(DONE) Bot will assign role that user types
//4.(DONE) Delete user message
//  a. delete bot message
//  b. delete all messages in specific channel
