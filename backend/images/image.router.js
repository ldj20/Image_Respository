const router = require("express").Router();
const { addImages, deleteImages } = require("./image.service");
const { checkUser } = require('../users/user.utility')

router.put("/image", checkUser, addImages);
router.delete("/image", checkUser, deleteImages);

module.exports = router;