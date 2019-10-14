const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  name: String,
  address: String,
  status: {
    cool:Boolean,
    normal:Boolean,
    black:Boolean,
  },
  Questions: [{
    id:mongoose.Schema.Types.ObjectId
  }]

});



module.exports = mongoose.model('Company', companySchema);

