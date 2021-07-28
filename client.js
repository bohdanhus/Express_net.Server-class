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
// SERVER
// const net = require('net');
// const clients = []
// const server = net.createServer(function(socket) {
// 	socket.write('Echo server\r\n');
// 	const port = socket.remotePort;
// 	console.log('Client IP. Port: ', socket.remoteAddress);
// 	console.log('Client connected. Port: ', port);
// 	socket.on('close', () => {
// 		let index = clients.indexOf(socket);
// 		clients.splice(index, 1);
// 		console.log('Closed ', port)
// 	})
// 	clients.push(socket)
// 	socket.on('data', (message) => {		
// 		clients.forEach(client => {
// 			if (client !== socket) {
// 				client.write(message);
// 			}
// 		})
// 	})
// 	socket.pipe(process.stdout)
// });
// server.listen(1337, '127.0.0.1');
// server.on('listening', () => { console.log('Listening on ', server.address()); })
/*
And connect with a tcp client from the command line using netcat, the *nix
utility for reading and writing across tcp/udp network connections.
$ netcat 127.0.0.1 1337
You should see:
> Echo server
*/