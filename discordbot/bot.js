const { Client, MessageAttachment } = require('discord.js');
var auth = require('./auth.json');
const client = new Client();

function SetPresenceDefault(timeDelay){
	var PresencePromise = new Promise(function(resolve, reject){
		setTimeout(function() {
            client.user.setPresence({status: 'online', activity: {name : 'Waiting for Alert', type: "LISTENING"}})
		}, timeDelay);
	});
	return PresencePromise;
}


client.on('ready', () => {
    console.log('I am ready!');
    client.user.setPresence({status: 'online', activity: {name : 'Waiting for Alert', type: "LISTENING"}})
});

client.on('message', message => {
    if (message.author.bot){
        return;
    } else {
        if(message.content === '!avatar'){
            message.reply(message.author.displayAvatarURL());
        } else if (message.content === '!clear'){
            const attachment = new MessageAttachment('./discordbot/doubtfire/clean.gif')
            message.channel.send(`${message.author}, don't worry Deary, I'll clean up this mess`, attachment);
            setTimeout(() => {
                try{
                    message.channel.bulkDelete(100);
                } catch (error) {
                    message.channel.send(`${message.author}, I couldn't delete the messages. Sorry`)
                }
            }, 20000);            
        } else if (message.content === '!hello'){
            const attachment = new MessageAttachment('./discordbot/doubtfire/hello.gif')
            message.channel.send(`HELLLOOOOO! ${message.author}`, attachment)
        } else if (message.content === '!help'){
            client.user.setPresence({status: 'dnd', activity: {name: "Mrs. Doubtfire", type: "WATCHING"}})
            const attachment = new MessageAttachment('./discordbot/doubtfire/help.gif')
            message.channel.send(`Help is on the way deary ${message.author}\u000D!clear: Deletes up to 100 of the last 14 days worth of messages. \u000D!avatar: Will show the link and URL to the user\'s avatar. \u000d!hello: Will greet you like any good bot should!`, attachment)
            message.channel.send() 
            SetPresenceDefault(6000)
        } else if (message.author === 'Grafana'){
            
        } else {
            message.channel.send(`Hello ${message.author}`)
            return;
        }
    }

});

// Log our bot in using the token from https://discordapp.com/developers/applications/me
client.login(auth.token);