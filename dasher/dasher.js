'use strict';

const io = require('socket.io-client');

const server = io.connect('http://localhost:3000/dash');

// Grab all of the parcel items when loading in


server.emit('getAll');


server.on('pickup', message => {
    console.log('Dasher picked up', message.orderID);

    setTimeout( () => {
        server.emit('in-transit', message);        
    }, 2000)

    setTimeout( ()=> {
        server.emit('delivered', message);
        console.log('Dahser delivered', message.orderID);
    }, 4000)
})

server.on('shipment', message => {
    console.log('I have to get this package', message.parcel);
    server.emit('recieved', message)
})
