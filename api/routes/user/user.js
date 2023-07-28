const express = require("express");
const router = express.Router();
const UserController = require("../../controller/userController");

router.get("/", UserController.find_users);

router.get("/:userId", UserController.find_user_by_id);

router.post("/", UserController.create_new_user);

module.exports = router;
