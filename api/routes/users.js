const tokenChecker = require("../middleware/tokenChecker");
const express = require("express");
const router = express.Router();

const UsersController = require("../controllers/users");

router.get("/", tokenChecker, UsersController.getProfile);
router.post("/", UsersController.create);
router.patch("/updatePassword", tokenChecker, UsersController.updatePassword);

module.exports = router;
