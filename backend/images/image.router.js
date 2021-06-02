const router = require("express").Router();
const { addImages, getImages } = require("./image.service");
const { checkUser } = require('../users/user.utility')

router.post("/", checkUser, addImages);
router.get("/", getImages);

module.exports = router;