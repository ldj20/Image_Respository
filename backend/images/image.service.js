const mongoose = require('mongoose');
const { Image } = require('./image.model');

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

module.exports = {
    createRepository: (req, res) => {
        
    },
    addImages: (req, res) => {
        //check if payload is over a certain amount
    },
    deleteImages: (req, res) => {
        
    },
}