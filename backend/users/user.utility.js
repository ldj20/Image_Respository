const User = require('./user.model');

module.exports = {
    checkUser: (req, res, next) => {
        if (req.isAuthenticated()) {
            next()
        } else {
            return res.redirect("/login")
        }
    }
}