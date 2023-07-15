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
const mongoose = require("mongoose");

const mongoDB = "mongodb://127.0.0.1/jauth";

// Waiting for database to connect, logging an error if there is a problem
main().catch((err) => console.log(err));
async function main() {
  console.log("Connecting Mongo DB at " + mongoDB);
  await mongoose.connect(mongoDB);
  console.log("Connected");
}

app.use(corsHandler);
app.use(successHandler);

app.use("/user", userRoute);

app.use((req, res, next) => {
  next(new CustomError(req.originalUrl + " not found", 404));
});

app.use(errorHandler);

module.exports = app;
