const mongoose = require('mongoose');

const connection = mongoose.connect("mongodb+srv://ashish:meel@cluster0.3tukwza.mongodb.net/SocialMediadata?retryWrites=true&w=majority");

module.exports = {
    connection
}