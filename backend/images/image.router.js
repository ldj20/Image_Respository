const router = require("express").Router();
const { addImages, getImages, deleteImages } = require("./image.service");
const { checkUser } = require('../users/user.utility')

router.post("/", checkUser, addImages);
router.get("/", getImages);
router.delete("/", checkUser, deleteImages);

module.exports = router;