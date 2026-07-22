const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static(__dirname));

io.on('connection', (socket) => {
    // รับออเดอร์ใหม่จากลูกค้า
    socket.on('new-order', (data) => io.emit('update-kitchen', data));

    // รับคำสั่งยกเลิกออเดอร์จากลูกค้า
    socket.on('cancel-order', (data) => io.emit('cancel-kitchen', data));

    // รับคำสั่งเมื่อครัวกดเสิร์ฟอาหาร แล้วส่งกระจายบอกทุกลูกค้าทันที
    socket.on('finish-order', (data) => {
        io.emit('order-finished', data);
    });
});

http.listen(3000, () => console.log('ร้านป้าแดงเปิดแล้วที่ http://localhost:3000'));
