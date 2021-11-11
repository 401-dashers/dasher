'use strict';

// Socket
const io = require('socket.io-client');
const vendor = io.connect('http://localhost:3000/dash');

const faker = require('faker');

// Command Line "Trigger"
const parcel = process.argv.splice(2)[0];

// Store/Room name
const store = 'Best Foods';

let delivery = {  
  orderID: faker.datatype.uuid(),
  foodItem: parcel,
  store: store,
  customer: faker.name.findName(),
  address: faker.address.cityName()
}

// Join the room
vendor.emit('join', store)

// Disconnect from the server after connecting
vendor.on('added', () => {
  vendor.disconnect();
})

vendor.emit('pickup', delivery)

// Create a placeholder 
vendor.on('pickup', pickupMessage)

// Create a placeholder 
vendor.on('delivered', deliveryMessage)

function deliveryMessage(payload) {
 console.log(`Your food order: ${payload.foodItem}, has been delivered! Thank you very much for shopping at ${payload.store}`);
  // console.log('WHAT IS IN THIS????',payload)
 vendor.emit('received', payload);
}

function pickupMessage(payload) {
  console.log(`There is a food order: ${payload.foodItem}, ready to be picked up!`)
}
