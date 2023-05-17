const express = require("express");
const app = express();
var login_shema = require("./login_shema");

const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1/nots_project", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());

const cors = require("cors");
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000"],
  })
);

// TODO login kontrol
app.get("/api/login/:ad_soyad/:sifre", (req, res) => {
  console.log("gelen verıler");
  console.log(req.params.ad_soyad);
  console.log(req.params.sifre);
  login_shema.find({ sifre: req.params.sifre }).then((data) => {
    console.log(data);
    res.send(data);
  });
});

// TODO BAĞLANTI
const port = 3000;
app.listen(port, () => {
  console.log("Node js http sıkıntısız bır sekılde calıstı");
});
