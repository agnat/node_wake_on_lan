var sys = require('sys'),
    Buffer = require('buffer').Buffer;

exports.createMagicPacket = function(mac) {
  var num_mac_octets = 6;
  if (mac.length == 2 * num_mac_octets + 5) {
    var sep = mac[2];
    mac = mac.replace(new RegExp(sep, 'g'), '');
  } else if (mac.length != 2 * num_mac_octets) {
    throw new Error("malformed MAC address '" + mac + "'");
  }

  var mac_buffer = new Buffer(num_mac_octets);
  for (var i = 0; i < num_mac_octets; ++i) {
    mac_buffer[i] = parseInt(mac.substr(2 * i, 2), 16);
  }

  var num_macs = 16;
  var buffer = new Buffer((1 + num_macs) * num_mac_octets);
  for (var i = 0; i < num_mac_octets; ++i) {
    buffer[i] = 0xff;
  }
  for (var i = 0; i < num_macs; ++i) {
    mac_buffer.copy(buffer, (i + 1) * num_mac_octets, 0, mac_buffer.length)
  }
  return buffer;
};
