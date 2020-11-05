const Discord = require("discord.js");
const client = new Discord.Client();
const config = require('./config.json');

////////////////START CLIENT/////////////////

client.once("ready", () => {
    console.log("Ready");
});

////////////////MESSAGE CODE/////////////////

client.on("message", message => {
    //Assigns user to role, shortly deletes message after
    if (message.content.toLowerCase() === "academy student") {

        let userInput = message.content.toLowerCase();
        let role = message.guild.roles.cache.find(role => role.name.toLowerCase() === userInput);
        if (role) {
            if (message.member.roles.cache.has(role.id)) {
                message.reply("You are already in the academy.").then(message => {message.delete({timeout: 5000})})
                message.delete({timeout: 5000});
            } else {
                message.member.roles.add(role)
                message.reply("Welcome to the Academy").then(message => {message.delete({timeout: 5000})});
                message.delete({timeout: 5000});
            }
        }
    }

});

client.login(config.token);

//1.(DONE) Bot can send webhook) Bot will display welcome webook w/ information regarding how to select a role
//2.(DONE) functionality is to listen) Bot will listen for "role" user types
//3.(DONE) Bot will assign role that user types
//4.(DONE) Delete user message
//  a. delete bot message
//  b. delete all messages in specific channel
