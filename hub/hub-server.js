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

  //------ create/join room-----//
  socket.on('join', (room) => {
    socket.join(room);
    console.log(socket.id, 'joined room', room);
  })

  socket.on('getAll', () => {
    console.log('Geting all shipments per driver request')
    Object.keys(queue.shipments).forEach(orderID => {
      socket.emit('pickup', queue.shipments[orderID])
    })
  })

  socket.on('driver-received', (orderID) => {
    delete queue.shipments[orderID];
  })

  socket.on('checkAll', () => {
    Object.keys(queue.delivered).forEach(orderID => {
      socket.emit('delivered', queue.delivered[orderID])
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
