const CustomError = require("../../error/CustomError");

const errorHandler = (err, req, res, next) => {
  console.error(err);

  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }
  if (err instanceof SyntaxError) {
    return res.status(400).json({
      success: false,
      message: "Some Error Occured.",
    });
  }

  res.status(500).json({ error: "Internal Server Error" });
  next(err);
};
module.exports = errorHandler;
