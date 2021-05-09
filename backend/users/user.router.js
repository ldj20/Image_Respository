const router = require("express").Router();
const { createUser, login, logout, changePassword } = require("./user.service");
const { checkUser } = require("./user.utility");

router.get("/", (req, res) => {
    return res.status(200).json({
        a: req.isAuthenticated()
    })
})
router.post("/", createUser);
router.post("/login", login);
router.post("/logout", logout);
router.put("/password", changePassword);

module.exports = router;