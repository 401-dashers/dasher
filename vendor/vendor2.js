'use strict';

//readline allows us to submit foods in terminal
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})

const io = require('socket.io-client');
const faker = require('faker');

const vendor = io.connect('http://localhost:3000/dash');
const store = 'Korean Barbecue';

vendor.emit('join', store)
vendor.emit('checkAll', store);

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

vendor.on('delivered', deliveryMessage)

function deliveryMessage(payload) {
  console.log(`Your food order: ${payload.foodItem}, has been delivered! Thank you very much for shopping at ${payload.store}!`);
  vendor.emit('received', payload); 
}

