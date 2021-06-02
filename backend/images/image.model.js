const mongoose = require('mongoose');
const random = require('mongoose-simple-random');

const imageSchema = new mongoose.Schema ({
    //path is always unique
    path: String,
    isPublic: Boolean,
    arrLocation: Number,
    extension: String,
    comments: [String]
})

imageSchema.plugin(random)

var Image = mongoose.model("Image", imageSchema);

module.exports = { Image, imageSchema }