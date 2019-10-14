const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {type: String, unique: true},
    email: {type: String, unique: true},
    password: String,
    regdate: {type: Date, default: new Date},
    subscriptions: Array,
    superuser: {type: Boolean, default: false},
});

userSchema.statics.mostRecent = async function() {
    return this.find().sort('regdate').limit(5).exec();
}

module.exports = mongoose.model('User', userSchema);

