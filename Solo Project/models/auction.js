const mongoose = require('mongoose');

const auctionSchema = new mongoose.Schema({
  user:mongoose.Schema.Types.ObjectId,
  name: String,
  condition: String,
  startdate: String,
  enddate: String,
  description: String,
});



module.exports = mongoose.model('Auction', auctionSchema);

