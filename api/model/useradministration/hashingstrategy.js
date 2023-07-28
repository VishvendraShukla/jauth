const mongoose = require("mongoose");
const hashingStrategySchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required: true,
    default: null,
  },
  enabled: {
    type: Boolean,
    required: true,
    default: false,
  },
  saltingRounds: {
    type: Number,
    default: null,
  },
});

module.exports = mongoose.model("HashingStrategy", hashingStrategySchema);
