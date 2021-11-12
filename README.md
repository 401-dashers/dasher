# 401-dasher food delivery service

## Description

Welcome to 401-dashers! We made an application based on a food delivery service! We will send our order and have that order tracked when it has been picked up, and when the food item was delivered! 

This app imitates having two restaurants and one dasher(delivery driver) that serves both vendors. The app uses queues to preserve orders in case a dasher logs off and reconnects later, and vice versa, to preserve delivery notifications for vendors to become aware that their orders were delivered, in case they too had gotten logged off and reconnected later.

Also, a dasher delivers all the orders from both vendors, but only notifies a specific vendor about completing their specific delivery, even when vendors log off and reconnect later.

## Authors

- Ayrat Gimranov, Software Developer
- Charlie Fadness, Software Developer
- Jeremy Brazell, Software Developer

## To Start

There are three folders: `hub`, `dasher` and `vendor`. Each folder represents a separate app. `vendor` folder contains two files: `vendor.js` and `vendor2.js`, that need to be started up separately.

First run `node hub-server.js` inside the `hub` folder. It is the brain. 

Then, we can to start our clients in any order.
- To start a dasher, run `node dasher.js` within a `dasher` folder. 
- To start a first restaurant ("Best Foods"), run `node vendor.js` within `vendor` folder.
- To start a second restaurant ("Korean Barbeque"), run `node vendor2.js` within the same `vendor` folder.

Once vendors are started, we can enter food items one by one directly into a terminal window of each vendor to trigger a pickup order for the dasher. This will send a notification to our dasher who will respond and pick up those food items to deliver! The driver will then notify a specific vendor once the restaurant's order has been delivered. Vendors will acknowledge that they were notified of a delivery by saying "Thank you"! And the hub will log out the whole process.

Clients do not have to run at the same time. Vendors can log on, place orders and log off. The dasher can log on later, carry out those orders and log off as well. When vendors log on the next time, they will get a notification that their orders have been completed.

If both drivers and vendors are logged on at the same, the driver will start carring out deliveries as soon they are entered.

## Data Modeling

### UML and WRRC

![UML and WWRC](./img/UML.png)  

## Technology Used

`"socket.io": "^4.3.2"`
`"socket.io-client": "^4.3.2"`
`"express": "^4.17.1"`
`"dotenv": "^10.0.0"`
`"cors": "^2.8.5"`

## Testing

To see our tests, you will have to be under the root folder of dashers, then type in the terminal `npm run test dasher.test.js`, this will run our tests and have them displayed to you!

## Install

Run `npm i` in each of the three folders: "hub", "vendor", "dasher"
