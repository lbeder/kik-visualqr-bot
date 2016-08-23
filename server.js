'use strict';

let config = require('./config.js');
let util = require('util');
let http = require('http');
let Bot = require('@kikinteractive/kik');
let base64Image = require('node-base64-image');
let request = require('request');

// Configure the bot API endpoint, details for your bot.
let bot = new Bot(config.Bot);
bot.updateBotConfiguration();

bot.onTextMessage((message) => {
  message.reply(message.body);
});

bot.onPictureMessage((message) => {
  message.reply('Working...');

  base64Image.encode(message.picUrl, {string: true}, (err, imageBase64) => {
    if (err) {
      message.reply(`Error: ${err.message}`);

      return;
    }

    let apiParams = {
      api_key: config.Visualead.apiKey,
      output_type: 1,
      action: 'url',
      image_quality: 90,
      content: 'http://visualead.com',
      ec_level: 'M',
      version: 3,
      qr_x: 0,
      qr_y: 0,
      cells_type: 2,
      markers_type: 1,
      contrast: 70,
      redirect: 1,
      visual_level: 2,
      marker_fg_color: '000000',
      free_ecc: 0,
      image: imageBase64
    };

    request({
        url: 'http://api.visualead.com/v3/generate_gen2',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(apiParams)
    }, (err, response, body) => {
      if (err) {
        message.reply(`Error: ${err.message}`);

        return;
      }

      if (response.statusCode != 200) {
        message.reply(`Error: ${response.statusMessage}`);

        return;
      }

      let result = JSON.parse(response.body);
      if (result.error) {
        message.reply(`Error: ${result.error}`);

        return;
      }

      message.reply(Bot.Message.picture(result.image_url));
      message.reply('Done!');
    });
  });
});

// Set up your server and start listening.
let server = http.createServer(bot.incoming()).listen(process.env.PORT || 8080);
