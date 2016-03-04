# Wake-on-LAN utilities for node.js

## Installation

````bash
npm install wake_on_lan --save  # use the library
npm install wake_on_lan -g      # optional global wake utility 
````

## Synopsis

To wake a machine with a given mac address do:

````js
var wol = require('wake_on_lan');

wol.wake('20:DE:20:DE:20:DE');

wol.wake('20:DE:20:DE:20:DE', function(error) {
  if (error) {
    // handle error
  } else {
    // done sending packets
  }
});

var magic_packet = wol.createMagicPacket('20:DE:20:DE:20:DE');
````

See [windows notes](#windows-notes) and the [wake utility](#the-wake-utility).

## Reference

MAC addresses are strings and may use any separator or no separator at all:

````js
'20:DE:20:DE:20:DE'
'20-DE-20-DE-20-DE'
'20DE20DE20DE'
````

### Function wake()

````
wake(mac, [options, callback])
````

Send a sequence of Wake-on-LAN magic packets to the given MAC address. The callback is called when all packets have been sent or an error occurs. The _options_ object may have the following properties:

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| `address` | The destination address | String | 255.255.255.255 |
| `num_packets` | The number of packets to send | Number | 3 |
| `interval` | The interval between packets in milliseconds | Number | 100 |
| `port` | The destination port to send to | Number | 9 |

### Function createMagicPacket()

````
createMagicPacket(mac)
````

Returns a buffer with a magic packet for the given MAC address.

## The wake utility

````
wake [options] MAC
````

### Options

| Option | Short | Description | Default |
| --- | --- | --- | --- |
| --address | -a | Broadcast address, ipv4 or ipv6 | 255.255.255.255 |
| --num_packets | -n | Number of packets to send | 3 |
| --interval | -i | Interval between each packet | 100 |
| --port | -p | UDP port of the target destination | 9 |
| --help | -h | Show help ||

### Examples

````bash
wake 20:DE:20:DE:20:DE
wake -a 192.168.1.255 20-DE-20-DE-20-DE
wake --num_packets 10 --interval 50 -p 9 20DE20DE20DE
````

## Windows Notes

Because windows routes global broadcasts differently from unix systems, it is necessary to specify a broadcast address manually, e.g:

````
wol.wake(someMac, { address: "192.168.2.255" }, wakeCallback);
````

Use [`os.networkInterfaces()`](https://nodejs.org/api/os.html#os_os_networkinterfaces) to calculate the broadcast address dynamically. See [@mwittig's comment](https://github.com/agnat/node_wake_on_lan/issues/4#issuecomment-156404241) for further information.

## Contributors

* Jann Horn [@thejh](http://github.com/thejh)
* mh-cbon [@mh-cbon](http://github.com/mh-cbon)

## License (MIT)

Copyright (c) 2010 David Siegel

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
