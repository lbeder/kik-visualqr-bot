'use strict';

let nconf = require('nconf');
let Path = require('path');

let envName = nconf.get('NODE_ENV') || 'development';

nconf.argv().env().file({file: Path.join(__dirname , 'config', envName + '.json')});

module.exports = {
  Bot: nconf.get('bot'),
  Visualead: nconf.get('visualead')
};
