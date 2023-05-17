const mongoose = require("mongoose");

const main_shema = new mongoose.Schema({
  plantime: { type: String },
  plandescription: { type: String },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("PlanListesi", main_shema);
