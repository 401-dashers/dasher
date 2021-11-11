'use strict';

const io = require('socket.io')(3000);

io.on('connection', (socket) => {
  console.log(`Client app connected to core with socket ID: ${socket.id}`)
})

const hub = io.of('/dash');

let queue = { shipments: {} };

hub.on('connection', (socket)=> {
  console.log('client joined:', socket.id);

  //------ create/join room-----//
  socket.on('join', (room)=>{
    socket.join(room);
    console.log(socket.id, 'joined room', room);
  })

  socket.on('getAll', () => {
    console.log('Get All')
    Object.keys(queue.shipments).forEach(id => {
      socket.emit('shipment', 
      { id, parcel: queue.shipments[id] })
    })
  })

  socket.on('pickup', payload => {
    foodLogger('pickup', payload)
    queue.shipments[payload.orderID] = payload;
    hub.emit('pickup', payload);    
  })

  socket.on('received', payload => {
    console.log('Food item was delivered', payload)

    delete queue.shipments[payload.orderID]
    socket.emit('added');
  })

  socket.on('in-transit', payload => {
    foodLogger('in-transit', payload)
    hub.emit('in-transit', payload)
  })

  socket.on('delivered', payload => {
    foodLogger('delivered', payload)
    hub.emit('delivered', payload)
  })
})

function foodLogger(event, payload) {
  let time = new Date();
  console.log('foodLogger start ----------')
  console.log({time, event, payload})
  console.log('foodLogger end ----------')
}
