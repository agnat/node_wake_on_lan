# Wake-on-LAN utilities for node.js

## Installation

````
npm install wake_on_lan
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

## Contributors

* Jann Horn ("@thejh":http://github.com/thejh)

## License (MIT)

Copyright (c) 2010 David Siegel

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

