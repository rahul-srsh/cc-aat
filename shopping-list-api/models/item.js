const mongoose = require("mongoose");

const itemSchema = mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  category: { type: String, required: true },
  userId: { type: String, required: true },
});

module.exports = mongoose.model("Item", itemSchema);
