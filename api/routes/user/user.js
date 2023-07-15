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

router.post("/:productId", (req, res, next) => {
  res.status(200).json({
    id: req.params.productId,
    message: "It works",
  });
});

module.exports = router;
