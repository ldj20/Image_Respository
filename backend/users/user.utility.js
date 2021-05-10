const User = require('./user.model');

module.exports = {
    checkUser: (req, res, next) => {
        if (req.isAuthenticated()) {
            next()
        } else {
            return res.status(401).json({
                message: "unauthorized",
                success: 0
            })
        }
    }
}