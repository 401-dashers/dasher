'use strict';

const io = require('socket.io-client');
const server = io.connect('http://localhost:3000/dash');

server.on('pickup', message => {   
    server.emit('join', message.store)

    console.log('Dasher picked up order #:', message.orderID);
    server.emit('driver-received', message.orderID)    
    
    setTimeout( () => {
        server.emit('in-transit', message);        
    }, 2000)
    
    setTimeout( ()=> {
        server.emit('delivered', message);
        console.log('Dasher delivered order #:', message.orderID);
    }, 4000)
})
server.emit('getAll');
