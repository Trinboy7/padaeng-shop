const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static(__dirname));

let soldOutMenus = {}; // เก็บสถานะเมนูที่หมด

io.on('connection', (socket) => {
    // ส่งสถานะเมนูหมดให้คนที่เพิ่งเข้าเว็บ
    socket.emit('init-soldout', soldOutMenus);

    // รับออเดอร์ใหม่
    socket.on('new-order', (data) => io.emit('update-kitchen', data));

    // ยกเลิกออเดอร์
    socket.on('cancel-order', (data) => io.emit('cancel-kitchen', data));

    // อัปเดตสถานะออเดอร์ (กำลังทำ / เสิร์ฟแล้ว)
    socket.on('update-status', (data) => io.emit('order-status-updated', data));

    // จัดการเมนูหมด
    socket.on('toggle-soldout', (menuName) => {
        soldOutMenus[menuName] = !soldOutMenus[menuName];
        io.emit('init-soldout', soldOutMenus);
    });
});

http.listen(3000, () => console.log('ร้านป้าแดงเปิดแล้วที่ http://localhost:3000'));
