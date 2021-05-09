const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema ({
    path: String,
    isPublic: Boolean,
    arrLocation: Number
})

var Image = mongoose.model("Image", imageSchema);

module.exports = { Image, imageSchema }