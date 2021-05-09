const router = require("express").Router();
const { addImages, deleteImages } = require("./image.service");
const { checkUser } = require('../users/user.utility')

router.post("/", checkUser, addImages);
router.delete("/", checkUser, deleteImages);

module.exports = router;