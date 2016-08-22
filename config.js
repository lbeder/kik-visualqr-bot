'use strict';

import nconf from 'nconf';
import Path from 'path';

nconf.argv().env().file({file: Path.join(__dirname , '../config.json')});

