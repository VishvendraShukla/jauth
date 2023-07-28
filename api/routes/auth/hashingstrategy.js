const express = require("express");
const HashingStrategy = require("../../model/useradministration/hashingstrategy");
const router = express.Router();
const mongoose = require("mongoose");

router.get("/", async (req, res, next) => {
  try {
    const strategyList = await HashingStrategy.find();
    res.success(handleJsonArray(strategyList));
  } catch (err) {
    next(err);
  }
});

router.get("/:strategyId", async (req, res, next) => {
  try {
    const strategy = await HashingStrategy.findById(req.params.strategyId);
    res.success(handleJson(strategy));
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const hashingstrategy = new HashingStrategy({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      enabled: req.body.enabled,
      saltingRounds: req.body.saltingRounds,
    });
    await hashingstrategy.save();
    res.success("Strategy Created");
  } catch (err) {
    next(err);
  }
});

function handleJsonArray(hashingstrategyArray) {
  const mappedHashingStrategyArray = [];
  hashingstrategyArray.forEach((element) =>
    mappedHashingStrategyArray.push(handleJson(element))
  );
  return mappedHashingStrategyArray;
}

function handleJson(hashingstrategy) {
  const hashingstrategyVO = {
    id: hashingstrategy.id,
    name: hashingstrategy.name,
    enabled: hashingstrategy.enabled,
    saltingRounds: hashingstrategy.saltingRounds,
  };
  return hashingstrategyVO;
}
module.exports = router;
