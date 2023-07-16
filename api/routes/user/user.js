const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../../model/user/user");
const UserController = require("../../controller/userController");

router.get("/", UserController.find_users);

router.get("/:userId", UserController.find_user_by_id);

router.post("/", async (req, res, next) => {
  try {
    const newUser = new User({
      _id: new mongoose.Types.ObjectId(),
      uniqueIdentifier: req.body.uniqueIdentifier,
      password: req.body.password,
      email: req.body.email,
      customValues: req.body.customValues,
    });
    const addedUser = await newUser.save();
    res.success(addedUser);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
