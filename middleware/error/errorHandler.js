const CustomError = require("../../error/CustomError");

const errorHandler = (err, req, res, next) => {
  console.error(err);

  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  res.status(500).json({ error: "Internal Server Error" });
  next(err);
};
module.exports = errorHandler;
