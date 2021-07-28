let net = require('net');

let HOST = '127.0.0.1';
let PORT = 6969;

// Создаем экземпляр сервера и связываем с ним функцию прослушивания
// Функция, переданная в net.createServer (), становится обработчиком события 'соединение'
// Объект sock, который функция обратного вызова получает UNIQUE для каждого соединения
net.createServer(function(sock) {
   // У нас есть соединение - объект сокета назначается соединению автоматически
   console.log('CONNECTED: ' + sock.remoteAddress +':'+ sock.remotePort);
   // Добавьте обработчик события data к этому экземпляру сокета
   sock.on('data', function(data) {
      console.log('DATA ' + sock.remoteAddress + ': ' + data);
      // Запишите данные обратно в сокет, клиент получит их как данные с сервера
      sock.write('You said "' + data + '"');
   });
   //
   // Добавьте обработчик события закрытия к этому экземпляру сокета
   sock.on('close', function(data) {
      console.log('CLOSED: ' + sock.remoteAddress +' '+ sock.remotePort);
   });

}).listen(PORT, HOST);

console.log('Server listening on ' + HOST +':'+ PORT);