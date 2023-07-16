function successHandler(req, res, next) {
  res.success = function (data) {
    res.status(200).json({
      success: true,
      payload: data,
    });
  };

  next();
}

module.exports = successHandler;
