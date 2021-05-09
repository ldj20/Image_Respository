const router = require("express").Router();
const { createUser, login, logout, deleteUser } = require("./user.service");
const { checkUser } = require("./user.utility");

router.get("/auth", (req, res) => {
    return res.status(200).json({
        authenticated: req.isAuthenticated()
    })
})
router.post("/", createUser);
router.post("/login", login);
router.get("/logout", logout);
router.delete('/delete', deleteUser);

module.exports = router;