const mongoose = require('mongoose');
const User = require('./user.model');
const passport = require('passport');
const bcrypt = require("bcryptjs");
const fs = require('file-system');

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

module.exports = {
    createUser: (req, res) => {
        const body = req.body;
        User.findOne({ email: body.email }, async (err, doc) => {
            if (err) {
                return res.status(500).json({
                    message: err,
                    success: 0
                })
            }
            else if (body.password == "") {
                return res.status(400).json({
                    message: "invalid inputs", 
                    success: 0
                })
            }
            const securePW = await bcrypt.hash(body.password, 10);
            const newUser = new User({
                email: body.email,
                password: securePW
            })
            newUser.save()
                .then(response => {
                    return res.status(201).json({success: 1});
                })
                .catch(err => {
                    return res.status(500).json({
                        message: err,
                        success: 0
                    })
                })
        })
    },
    getUser: (req, res) => {
        res.send(req.user);
    },
    login: (req, res, next) => {
        passport.authenticate("local", (err, user, info) => {
            if (err) {
                return res.status(500).json({
                    message: err,
                    success: 0
                })
            }
            else if (!user) {
                return res.status(400).json({
                    error: "invalid credentials",
                    success: 0
                })
            }
            req.login(user, err => {
                if (err) {
                    return res.status(500).json({
                        message: err,
                        success: 0
                    })
                }
                return res.status(200).json({
                    message: "valid user",
                    success: 1
                })
            })
        })(req, res, next);
    },
    logout: (req, res) => {
        req.logout();
        return res.status(200).json({
            success: 1
        })
    },
    getImages: (req, res) => {
        //should be authenticated already
        const userEmail = req.user.email
        //console.log(req.files[0].buffer) 
        User.findOne({ email: userEmail }, (err, user) => {
            if (err) {
                return res.status(500).json({
                    message: err,
                    success: 0
                })
            }
            const images = []
            for (var i = 0; i < user.images.length; i++) {
                const currPath = user.images[i].path
                images.push(fs.readFileSync(currPath))
            }
            return res.status(200).json({
                results: images,
                success: 1
            })
        })
    }
}