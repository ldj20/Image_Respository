const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const { imageSchema } = require('../images/image.model');

const userSchema = new mongoose.Schema ({
    email: { type : String , unique : true, required : true, dropDups: true },
    images: [imageSchema]
})

userSchema.plugin(passportLocalMongoose, { 
    usernameField: 'email',
});

const User = mongoose.model("User", userSchema);

module.exports = User