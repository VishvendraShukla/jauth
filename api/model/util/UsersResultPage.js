const UserResultPage = class {
  constructor(userList, docSize, currentPage) {
    this.currentPage = currentPage;
    this.docSize = docSize;
    this.userList = userList;
  }

  render() {
    const userListVO = [];
    this.userList.forEach((user) => {
      userListVO.push(
        new UserVO(
          user.id,
          user.uniqueIdentifier,
          user.password,
          user.email,
          user.customValues
        )
      );
    });
    const result = {
      resultPage: {
        total: parseInt(this.docSize),
        currentPage: parseInt(this.currentPage),
        pageSize: parseInt(this.userList.length),
        elements: userListVO,
      },
    };
    return result;
  }
};

const UserVO = class {
  constructor(id, uniqueIdentifier, password, email, customValues) {
    this.id = id;
    this.uniqueIdentifier = uniqueIdentifier;
    this.password = password;
    this.email = email;
    this.customValues = customValues;
  }
};
module.exports = UserResultPage;
module.exports = UserVO;
