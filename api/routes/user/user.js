const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../../model/user/user");

router.get("/", async (req, res, next) => {
  try {
    const pageSize = req.query.pageSize || "10";
    const userList = await User.find().limit(pageSize);
    res.success(userList);
  } catch (error) {
    next(error);
  }
});

router.get("/:userId", async (req, res, next) => {
  try {
    const userById = await User.findById(req.params.userId);
    if (userById) {
      res.success(userById);
    } else {
      res.success({ message: req.params.userId + " Not Found" });
    }
  } catch (error) {
    next(error);
  }
});

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
