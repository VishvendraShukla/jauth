const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  const data = { userId: 234, name: "Vishvendra Vijay Shukla", age: 23 };
  try {
    res.success(data);
  } catch (error) {
    console.log("Here");
    next(error);
  }
});

router.post("/", (req, res, next) => {
  const data = {
    userId: req.body.userId,
    name: req.body.name,
    age: req.body.age,
  };
  res.success(data);
});

module.exports = router;
