const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static(__dirname));

io.on('connection', (socket) => {
    socket.on('new-order', (data) => io.emit('update-kitchen', data));
});

http.listen(3000, () => console.log('ร้านป้าแดงเปิดแล้วที่ http://localhost:3000'));