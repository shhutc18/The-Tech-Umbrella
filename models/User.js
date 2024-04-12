const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    user: { type: String, required: true },
    username: string,
    password: string,
});

const Item = mongoose.model('Item', userSchema);

module.exports = Item;