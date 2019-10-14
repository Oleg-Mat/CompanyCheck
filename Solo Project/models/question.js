const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  companyname:String,
  name: String,
  answer: String,
  category: String,
});

module.exports = mongoose.model('Question', questionSchema);

