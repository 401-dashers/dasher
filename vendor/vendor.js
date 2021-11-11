'use strict';

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})

// Socket
const io = require('socket.io-client');
const vendor = io.connect('http://localhost:3000/dash');

const faker = require('faker');

vendor.emit('checkAll');

// Store/Room name
const store = 'Best Foods';


// Join the room
vendor.emit('join', store)


const cliInput = () => {

  readline.question(``, food => {
    let delivery = {
      orderID: faker.datatype.uuid(),
      foodItem: food,
      store: store,
      customer: faker.name.findName(),
      address: faker.address.streetAddress() + ', ' + faker.address.stateAbbr() + ' ' + faker.address.zipCode()
    }
    vendor.emit('pickup', delivery);
    cliInput();
  })
}

cliInput();

// Create a placeholder 
// vendor.on('pickup', pickupMessage)

// Create a placeholder 
vendor.on('delivered', deliveryMessage)

function deliveryMessage(payload) {
  console.log(`Your food order: ${payload.foodItem}, has been delivered! Thank you very much for shopping at ${payload.store}!`);

  vendor.emit('received', payload);
}

// function pickupMessage(payload) {
//   console.log(`There is a food order: ${payload.foodItem}, ready to be picked up!`)
// }
