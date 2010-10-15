#!/usr/bin/env node

var wol  = require('./wake_on_lan')
  , path = require('path')
  ;

process.title = path.basename(__filename);

if (process.argv.length != 3) {
  console.log('Usage: ' + process.title + " MAC");
  process.exit(1);
}

var mac = process.argv[2];

wol.wake(mac, function(error) {
  if (error) {
    console.log("kaputt: " + error);
  } else {
    console.log('done sending WoL packets');
  }
});

