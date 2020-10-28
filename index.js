const Discord = require("discord.js");
const client = new Discord.Client();
const config = require('./config.json');

const embed = new Discord.MessageEmbed()
    .setTitle("Select a Role")
    .setDescription("PEKO")
    .setColor("#dcd6f7")

client.once("ready", () => {
    console.log("Ready");
});

client.once("ready", async () => {
    const channel = client.channels.cache.get(config.channel_id);
    try {
        const webhooks = await channel.fetchWebhooks();
        const webhook = webhooks.first();

        await webhook.send(null, {
            // avatarURL: "https://cdn.discordapp.com/attachments/342550444947800065/770840177308073994/missionDesk.png",
            embeds: [embed],
        });
    } catch (error) {
        console.error("Error trying to send: ", error);
    }
});



client.on('message', message => {
	if (message.content === config.prefix + "ping") {
        message.reply("Pong.");
    } else if (message.content === config.prefix + "server"){
        message.reply("This server's name is " + message.guild.name);
    }
});

client.login(config.token);

//1. bot displays available roles for users to choose via emotes with webhook  
//DONE  a. get bot to display webhook w/ some description
//  b. get bot to display emotes with webhook
//2. after selection of emote bot will assign user role