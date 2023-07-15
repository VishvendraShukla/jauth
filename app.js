const express = require("express");

const app = express();
const morgan = require("morgan");
const successHandler = require("./middleware/success/successHandler");
const errorHandler = require("./middleware/error/errorHandler");
const bodyParser = require("body-parser");
const userRoute = require("./api/routes/user/user");
const CustomError = require("./error/CustomError");
const corsHandler = require("./middleware/cors/cors");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan("combined"));

app.use(corsHandler);
app.use(successHandler);

app.use("/user", userRoute);

app.use((req, res, next) => {
  next(new CustomError(req.originalUrl + " not found", 404));
});

app.use(errorHandler);

module.exports = app;
