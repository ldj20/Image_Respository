const router = require("express").Router();
const { createUser, login, logout, getImages } = require("./user.service");
const { checkUser } = require("./user.utility");

router.get("/auth", (req, res) => {
    return res.status(200).json({
        authenticated: req.isAuthenticated()
    })
})
router.post("/", createUser);
router.post("/login", login);
router.get("/logout", logout);
router.get("/images", checkUser, getImages);

module.exports = router;