'use strict';

//readline allows us to submit foods in terminal
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})

// Socket
const io = require('socket.io-client');
const faker = require('faker');

const vendor = io.connect('http://localhost:3000/dash');


vendor.emit('checkAll');

// Store/Room name
const store = 'Korean Barbecue';

// Create a room that carries the store's name
vendor.emit('join', store)


const cliInput = () => {

  //will show a question in terminal and wait for a response before running a callback function
  readline.question(``, food => {
    let delivery = {
      orderID: faker.datatype.uuid(),
      foodItem: food, //foodname we enter in terminal will appear here
      store: store,
      customer: faker.name.findName(),
      address: faker.address.streetAddress() + ', ' + faker.address.stateAbbr() + ' ' + faker.address.zipCode()
    }
    vendor.emit('pickup', delivery);
    cliInput(); //re-invoke itself so that we can keep entering foods in terminal without disconnecting
  })
}

cliInput(); //initial invokation of a fucntion that will ask for our input in terminal

vendor.on('delivered', deliveryMessage)

function deliveryMessage(payload) {
  console.log(`Your food order: ${payload.foodItem}, has been delivered! Thank you very much for shopping at ${payload.store}!`);

  vendor.emit('received', payload); //telling the hub that vendor is now aware that delivery has been completed
}

