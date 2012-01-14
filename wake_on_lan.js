var dgram  = require('dgram')
  , Buffer = require('buffer').Buffer
  ;

var num_mac_octets = 6;

exports.createMagicPacket = function(mac) {
  var mac_buffer = new Buffer(num_mac_octets)
    , i
    ;
  if (mac.length == 2 * num_mac_octets + (num_mac_octets - 1)) {
    mac = mac.replace(new RegExp(mac[2], 'g'), '');
  }
  if (mac.length != 2 * num_mac_octets || mac.match(/[^a-fA-F0-9]/)) {
    throw new Error("malformed MAC address '" + mac + "'");
  }

  for (i = 0; i < num_mac_octets; ++i) {
    mac_buffer[i] = parseInt(mac.substr(2 * i, 2), 16);
  }

  var num_macs = 16
    , buffer   = new Buffer((1 + num_macs) * num_mac_octets);
  for (i = 0; i < num_mac_octets; ++i) {
    buffer[i] = 0xff;
  }
  for (i = 0; i < num_macs; ++i) {
    mac_buffer.copy(buffer, (i + 1) * num_mac_octets, 0, mac_buffer.length)
  }
  return buffer;
};

exports.wake = function(mac, opts, callback) {
  if (typeof opts === 'function') {
    callback = opts;
    opts = undefined;
  }

  opts = opts || {};

  var address     = opts['address']     || '255.255.255.255'
    , num_packets = opts['num_packets'] || 3
    , interval    = opts['interval']    || 100
    , port        = opts['port']        || 9
    , magic_packet = exports.createMagicPacket(mac)
    , socket = dgram.createSocket('udp4')
    , i = 0
    , timer_id
    ;

  socket.setBroadcast(true);
  function handler(error) {
    if (error || i === num_packets) {
      socket.close();
      if (timer_id) {
        clearTimeout(timer_id);
      }
      if (callback) {
        callback(error);
      }
    }
  }
  function sendWoL() {
    i += 1;
    socket.send(magic_packet, 0, magic_packet.length, port, address, handler);
    if (i < num_packets) {
      timer_id = setTimeout(sendWoL, interval);
    } else {
      timer_id = undefined;
    }
  }
  sendWoL();
}

