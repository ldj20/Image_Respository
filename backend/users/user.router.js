const router = require("express").Router();
const { createUser, login, logout, changePassword } = require("./user.service");
const passport = require("passport");
const { checkUser } = require("./user.utility");

router.get("/check", checkUser, () => {return res.status(200).json({
        status: 1
    });
})
router.post("/", createUser);
router.post("/login", login);
router.post("/logout", logout);
router.put("/password", changePassword);

module.exports = router;