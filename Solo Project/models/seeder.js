const Channel = require('./channel');
const faker = require('faker');
const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/crud_test", {useNewUrlParser: true});

async function createChannel() {
    const channel = new Channel({
        name: faker.commerce.productName(),
        price: Math.floor(Math.random() * 100),
        subscribers: []
    });

    await channel.save();
    console.log(channel);
};

createChannel();
createChannel();
createChannel();
createChannel();
createChannel();