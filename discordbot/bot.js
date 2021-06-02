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
    console.log('Mrs. Doubtfire ready for service!');
    client.user.setPresence({status: 'online', activity: {name : 'Waiting for Alert', type: "LISTENING"}})
});

client.on('message', message => {
    //console.log(message)
    if (message.author.bot){
        if(message.author.username === 'Grafana'){
            console.log(message.embeds[0].description);
            if (message.embeds[0].title.includes('[Alerting]')){
                message.channel.send(`${message.author} I can't believe it's broken! I'll get <@401597431252516866> to try to fix it.`)
            }
        }
        return;
    } else {
        //console.log(message.author)
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
            }, 10000);            
        } else if (message.content === '!hello'){
            const attachment = new MessageAttachment('./discordbot/doubtfire/hello.gif')
            message.channel.send(`HELLLOOOOO! ${message.author}`, attachment)
        } else if (message.content === '!help'){
            client.user.setPresence({status: 'dnd', activity: {name: "Mrs. Doubtfire", type: "WATCHING"}})
            const attachment = new MessageAttachment('./discordbot/doubtfire/help.gif')
            message.channel.send(`Help is on the way deary ${message.author}\u000D!clear: Deletes up to 100 of the last 14 days worth of messages. \u000D!avatar: Will show the link and URL to the user\'s avatar. \u000d!hello: Will greet you like any good bot should!`, attachment)
            message.channel.send() 
            SetPresenceDefault(6000)
        } //else {
        //     message.channel.send(`Hello ${message.author}`)
        //     return;
        // }
    }

});

// Log our bot in using the token from https://discordapp.com/developers/applications/me
client.login(auth.token);