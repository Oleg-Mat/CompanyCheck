const Auction = require('./auction');
const faker = require('faker');
const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/Auction", {useNewUrlParser: true});

async function createAuction() {
    const auction = new Auction({
      user: "5d82aba0f7576a5ee8cb8133",
      name: faker.name.title(),
      condition: faker.name.title(),
      startdate: new Date(),
      enddate: faker.date.future(),
      description: "bla bla",
    });

    await auction.save();
    // console.log(channel);
};

createAuction();
