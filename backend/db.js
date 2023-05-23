const express = require("express");
const app = express();
var login_shema = require("./login_shema");
var main_shema = require("./main_shema");

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

// TODO Plan kaydı yapıldı
app.post("/api/main", (req, res) => {
  console.log("bakalım verı gelıyormu bakalım");
  console.log(req.body);
  main_shema.create(req.body);
});

// TODO verılerı yansıtma kısmı burda
app.get("/api/veriler", (req, res) => {
  main_shema.find({}).then((data) => {
    res.send(data);
  });
});

// TODO 0 -> 1 yapmak işlemi yapma işlemi yapıldı
app.get("/api/planTakibi/:veri_id", (req, res) => {
  console.log("gelen veri:");
  console.log(req.params.veri_id);

  main_shema
    .findOneAndUpdate(
      {
        _id: req.params.veri_id,
      },
      {
        $set: {
          makeit: 1,
        },
      }
    )
    .then((result) => {
      veri = "1 yapıldı";
      res.status(200).send({
        result: veri,
      });
      console.log("1 yapıldı");
    })
    .catch((err) => {
      console.log(err);
    });
});

// TODO 1 -> 0 yapma işlemi yapılacak
app.get("/api/planTakibiiki/:veri_id", (req, res) => {
  console.log("gelen veri:");
  console.log(req.params.veri_id);

  main_shema
    .findOneAndUpdate(
      {
        _id: req.params.veri_id,
      },
      {
        $set: {
          makeit: 0,
        },
      }
    )
    .then((result) => {
      veri = "0 yapıldı";
      res.status(200).send({
        result: veri,
      });
      console.log("0 yapıldı");
    })
    .catch((err) => {
      console.log(err);
    });
});

// TODO tablo temızleme işlemi
app.get("/api/tablotemizle", (req, res) => {
  main_shema.deleteMany({}).then((data) => {
    res.send(data);
  });
});

// TODO plan silme işlemi yapılacak
app.get("/api/planSil/:veri_id", (req, res) => {
  console.log("sılınece plan ıd sı");
  console.log(req.params.veri_id);
  main_shema.deleteOne({ _id: req.params.veri_id }).then((data) => {
    res.send(data);
  });
});

// TODO BAĞLANTI
const port = 3000;
app.listen(port, () => {
  console.log("Node js http sıkıntısız bır sekılde calıstı");
});
