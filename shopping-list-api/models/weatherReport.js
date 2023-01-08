const mongoose = require("mongoose");

const weatherSchema = mongoose.Schema({
  date: { type: Date, default: Date.now },
  description: String,
  temp: mongoose.Decimal128,
  feels_like: mongoose.Decimal128,
  humidity: Number,
  city: String,
});

module.exports = mongoose.model("Weather", weatherSchema);
