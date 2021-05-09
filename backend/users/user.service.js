const mongoose = require('mongoose');
const User = require('./user.model');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

module.exports = {
    createUser: (req, res) => {
        const body = req.body;
        const fields = new User ({
            email: body.email,
        })
        User.register(fields, body.password, function(err, user) {
            if (err) {
                return res.status(500).json({
                    error: err.message,
                    status: err.status
                })
            }
            return res.status(201).json({
                data: user,
                status: 1
            });
        })
    },
    login: (req, res) => {
        console.log(req.isAuthenticated());
        const user = new User({
            email: req.body.email,
            password: req.body.password
        });
        console.log(user)
        req.login(user, function(err){
            if (err || req.body.password == "") {
                return res.status(401).json({
                    error: err,
                    status: 0
                })
            } else {
                passport.authenticate("local" )(req, res, function() {
                    return res.status(200).json({
                        status: 1
                    })
                });
            }
        });
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