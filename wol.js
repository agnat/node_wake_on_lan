var sys = require('sys'),
    dgram = require('dgram'),
    wol = require('./wake_on_lan');

if (process.argv.length != 3) {
  sys.puts('Usage: ' + process.argv[0] + " " + process.argv[1] + " <MAC>");
  process.exit(1);
}

var mac = process.argv[2];

var magic_packet = wol.createMagicPacket(mac);


var address = "255.255.255.255";
var socket = dgram.createSocket(true);
var done_callback = function() {
    socket.close();
};

var i = 0;
var num_packets = 3;
var packet_interval = 100; //ms
sys.puts("sending " + num_packets + " WOL packets to " + mac);
function sendWOL() {
  ++i;
  socket.send(4143, address, magic_packet, 0, magic_packet.length,
      i < num_packets ? null : done_callback);
  if (i < num_packets) {
    setTimeout(sendWOL, packet_interval);
  }
}
sendWOL();

