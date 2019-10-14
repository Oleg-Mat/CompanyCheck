const mongoose = require('mongoose');

const channelSchema = new mongoose.Schema({
    name: {type: String, unique: true},
    price: Number,
    startdate: {type: Date, default: new Date},
    subscribers: [Object],
});

channelSchema.statics.mostRecent = async function() {
    return this.find().sort('regdate').limit(5).exec();
}

module.exports = mongoose.model('Channel', channelSchema);

