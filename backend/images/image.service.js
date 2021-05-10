const mongoose = require('mongoose');
const { Image } = require('./image.model');
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
const multer = require('multer');
const User = require('../users/user.model');
const fs = require('file-system');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      return cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      var ext = file.mimetype.split('/')[1];
      return cb(null, '-' + Date.now() + "." + ext);
    }
  })

const upload = multer({ storage: storage, limits: {fileSize: 10000000}}).array('file', 1000); 


module.exports = {
    addImages: (req, res) => {
        upload(req, res, function(err) {
            if (req.files.length == 0) {
                return res.status(422).json({
                    message: "no file attached",
                    success: 0
                })
            }
            if (err instanceof multer.MulterError) {
                return res.status(422).json({
                    message: "too many images",
                    success: 0
                })
            } else if (err) {
                return res.status(500).json({
                    message: err,
                    success: 0
                })
            }
            const userEmail = req.user.email
            //console.log(req.files[0].buffer) 
            User.findOne({ email: userEmail }, (err, user) => {
                //user should definitely be in the database
                if (err) throw err;
                const currImgs = user.images
                var currIndex = currImgs.length
                const isPublic = req.body.isPublic == 'true'
                const imgArr = []
                for (var i = 0; i < req.files.length; i++) {
                    currIndex++;
                    const newImage = new Image({
                        path: req.files[i].path,
                        isPublic: isPublic,
                        arrLocation: currIndex,
                        extension: req.files[i].mimetype.split('/')[1]
                    })
                    imgArr.push(newImage)
                }
                const mergedArr = currImgs.concat(imgArr)
                user.images = mergedArr
                user.save()
                    .then(() => {
                            Image.insertMany(imgArr)
                                .then(() => {
                                    return res.status(200).json({
                                        message: "succesfully uploaded",
                                        success: 1
                                    })
                                })
                                .catch(err => {
                                    return res.status(500).json({
                                        message: err,
                                        success: 0
                                    })
                                })
                    })
                    .catch(err => {
                        return res.status(500).json({
                            message: err,
                            success: 0
                        })
                    })
            })
        })
        
    },
    getImages: (req, res) => {
        const filter = { isPublic: true }
        Image.findRandom(filter, {}, {limit: 5}, function(err, results) {
            if (err || results == null) {
                return res.status(500).json({
                    message: err,
                    success: 0
                })
            }
            const images = []
            const extensions = []
            for (var i = 0; i < results.length; i++) {
                const currPath = results[i].path
                const ext = results[i].extension
                images.push(fs.readFileSync(currPath))
                extensions.push(ext)
            }
            return res.status(200).json({
                results: images,
                extensions: extensions,
                success: 1
            })
        });
    },
    deleteImages: (req, res) => {
        
    },
    backgroundProcess: (req, res) => {

    }
}