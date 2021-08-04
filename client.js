var net = require('net');
var client = new net.Socket();
client.on('close', function() {
	console.log('Connection closed');
});
client.on('data', function(data) {
	console.log('Received: ' + data);
	client.destroy(); // kill client after server's response
});
client.connect(1337, '127.0.0.1', function() {
	console.log('Connected');
	client.write('Hello, server! Love, Client.');
});
