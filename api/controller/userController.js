const UserNotFoundError = require("../../error/UserNotFoundError");
const User = require("../model/user/user");
const UserVO = require("../model/util/UsersResultPage");
const UserResultPage = require("../model/util/UsersResultPage");

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
