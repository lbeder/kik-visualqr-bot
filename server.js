'use strict';

let config = require('./config.js');
let util = require('util');
let http = require('http');
let Bot = require('@kikinteractive/kik');

// Configure the bot API endpoint, details for your bot.
let bot = new Bot(config.Bot);
bot.updateBotConfiguration();

bot.onTextMessage((message) => {
  message.reply(message.body);
});

// Set up your server and start listening
let server = http.createServer(bot.incoming()).listen(process.env.PORT || 8080);
