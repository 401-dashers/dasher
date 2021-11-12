'use strict';

const io = require('socket.io')(3000);
io.on('connection', (socket) => {
  console.log(`Client app connected to core with socket ID: ${socket.id}`)
})

const hub = io.of('/dash');

let queue = {
  shipments: {},
  delivered: {}
};

hub.on('connection', (socket) => {
  console.log('client joined:', socket.id);

  socket.on('join', (room) => {
    socket.join(room);
    console.log('User #', socket.id, 'joined room', room);
  })

  socket.on('getAll', () => {
    console.log('Getting all shipments per driver request')
    Object.keys(queue.shipments).forEach(orderID => {
      socket.emit('pickup', queue.shipments[orderID])
    })
  })

  socket.on('driver-received', (orderID) => {
    delete queue.shipments[orderID];
  })

  socket.on('checkAll', (store) => {
    console.log('Checking completion status of deliveries per vendor request')
    Object.keys(queue.delivered).forEach(orderID => { 
      if(store === queue.delivered[orderID].store){
        socket.emit('delivered', queue.delivered[orderID])
      }
    })
  })

  socket.on('pickup', payload => {
    foodLogger('pickup', payload)
    queue.shipments[payload.orderID] = payload;
    hub.emit('pickup', payload);
  })

  socket.on('in-transit', payload => {
    foodLogger('in-transit', payload)
    hub.emit('in-transit', payload)
  })

  socket.on('delivered', payload => {
    foodLogger('delivered', payload)
    queue.delivered[payload.orderID] = payload;
    hub.to(payload.store).emit('delivered', payload);
  })

  socket.on('received', payload => {
    delete queue.delivered[payload.orderID];
  })
})

function foodLogger(event, payload) {
  let time = new Date();
  console.log('foodLogger start ----------')
  console.log({ time, event, payload })
  console.log('foodLogger end ----------')
}
