const mongoose = require('mongoose');
const { imageSchema } = require('../images/image.model');

const userSchema = new mongoose.Schema ({
    email: { type : String , required : true , unique : true , dropDups: true },
    password: { type : String , required : true },
    images: [imageSchema]
})

const User = mongoose.model("User", userSchema);

module.exports = User