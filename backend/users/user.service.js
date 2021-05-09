const mongoose = require('mongoose');
const User = require('./user.model');
const passport = require('passport');
const bcrypt = require("bcryptjs");
const saltRounds = 10;

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
        console.log(req.body);
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
        res.redirect("/");
    },
    //i'm not getting back the messages in the json so we're just using status for error handling rn
    changePassword: (req, res) => {
        if (req.isAuthenticated()) {
            const dict = req.body;
            const entries = Object.keys(dict);
            for (let i = 0; i < entries.length; i++) {
                if (dict[entries[i]] == null || (dict[entries[i]]) == undefined || (dict[entries[i]]) == "") {
                    return res.status(404).json({message: "empty field"});
                }
            }
            if (dict.newPass == dict.confirmation) {
                User.findByUsername(req.session.passport.user).then(function(sanitizedUser){
                    if (sanitizedUser){
                        sanitizedUser.setPassword(dict.newPass, function(){
                            sanitizedUser.save();
                            return res.status(200).json({message: 'password reset successful'});
                        });
                    } else {
                        return res.status(500).json({message: 'This user does not exist'});
                    }
                },function(err){
                    console.log(err);
                })
            } else {
                return res.status(404).json({message: "passwords don't match"});
            }
        } else {
            return res.redirect("/portal");
        }
    }
}