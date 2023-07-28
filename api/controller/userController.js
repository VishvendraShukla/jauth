const UserNotFoundError = require("../../error/UserNotFoundError");
const User = require("../model/user/user");
const HashingStrategy = require("../model/useradministration/hashingstrategy");
const UserResultPage = require("../model/util/UsersResultPage");
const bcrypt = require("bcrypt");
const argon2 = require("argon2");
const mongoose = require("mongoose");
const CustomError = require("../../error/CustomError");

exports.find_users = async (req, res, next) => {
  try {
    const currentPage = req.query.currentPage || 0;
    const pageSize = req.query.pageSize || 10;
    const skipDocuments = currentPage * pageSize;
    const userList = await User.find().skip(skipDocuments).limit(pageSize);
    const docSize = await User.countDocuments();
    res.success(
      new UserResultPage.UserResultPage(userList, docSize, currentPage).render()
    );
  } catch (error) {
    next(error);
  }
};

exports.find_user_by_id = async (req, res, next) => {
  try {
    const userById = await User.findById(req.params.userId);
    if (userById) {
      res.success(
        new UserResultPage.UserVO(
          userById.id,
          userById.uniqueIdentifier,
          userById.password,
          userById.email,
          userById.customValues
        )
      );
    } else {
      throw new UserNotFoundError(
        "User with id: " + req.params.userId + " not found",
        400
      );
    }
  } catch (error) {
    next(error);
  }
};

exports.create_new_user = async (req, res, next) => {
  try {
    const hashingStrategyArray = await HashingStrategy.find({ enabled: true });
    if (hashingStrategyArray.length) {
      let hashedPassword = await hashPassword(
        hashingStrategyArray[0],
        req.body.password
      );
      const newUser = new User({
        _id: new mongoose.Types.ObjectId(),
        uniqueIdentifier: req.body.uniqueIdentifier,
        password: hashedPassword,
        email: req.body.email,
        customValues: req.body.customValues,
      });

      const addedUser = await newUser.save();
      res.success(
        new UserResultPage.UserVO(
          addedUser.id,
          addedUser.uniqueIdentifier,
          addedUser.password,
          addedUser.email,
          addedUser.customValues
        )
      );
    } else {
      throw new CustomError("Some Error Occured", 400);
    }
  } catch (err) {
    next(err);
  }
};

async function hashPassword(hashingstrategy, plaintextPassword) {
  let hash = "";
  switch (hashingstrategy.name) {
    case "bcrypt":
      const salt = await bcrypt.genSalt(hashingstrategy.saltingRounds);
      hash = await bcrypt.hash(plaintextPassword, salt);
      break;

    case "Argon2":
      hash = await argon2.hash(plaintextPassword);
      break;
    default:
      hash = plaintextPassword;
      break;
  }
  return hash;
}
