const mongoose = require("mongoose");

const login_shema = new mongoose.Schema({
  ad_soyad: { type: String },
  sifre: { type: String },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("nots_project", login_shema);
