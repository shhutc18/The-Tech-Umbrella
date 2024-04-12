const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    user: { type: String, required: true },
    username: string,
    password: string,
});

const postSchema = new mongoose.Schema({
    post: { type: String, required: true },
    title: string,
    body: string,
    category: string,
    likes: Number,
});

const commentsSchema = new mongoose.Schema({
    post: { type: String, required: true },
    body: string,
    likes: Number,
});

const Item = mongoose.model('Item', umbrellaSchema);

const handleError = (err) => console.error(err);

module.exports = Item;