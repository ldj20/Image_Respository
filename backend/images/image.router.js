const router = require("express").Router();
const { addImages, getImages } = require("./image.service");
const { checkUser } = require('../users/user.utility')

router.post("/", checkUser, addImages);
router.get("/", checkUser, getImages);

module.exports = router;