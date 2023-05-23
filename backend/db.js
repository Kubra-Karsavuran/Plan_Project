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

// TODO plan takıbı yapılıyor burda 1 or 0
// NOT: 0= yapılmadı 1= yapıldı
let veri = 2;
app.get("/api/planTakibi", (req, res) => {
  main_shema.find({ makeit: 0 }).then((data) => {
    if (data == "") {
      //plan yapıldı 1->0
      main_shema
        .findOneAndUpdate(
          {
            makeit: 1,
          },
          {
            $set: {
              makeit: 0,
            },
          }
        )
        .then((result) => {
          veri = 0;
          res.status(200).send({
            result: veri,
          });
          next();
          console.log("0 yapıldı");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      //plan yapılmadı 1 yapılacak 0->1
      main_shema
        .findOneAndUpdate(
          {
            makeit: 0,
          },
          {
            $set: {
              makeit: 1,
            },
          }
        )
        .then((result) => {
          veri = 1;
          res.status(200).send({
            result: veri,
          });
          next();
          console.log("1 yapıldı");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
});

// TODO BAĞLANTI
const port = 3000;
app.listen(port, () => {
  console.log("Node js http sıkıntısız bır sekılde calıstı");
});
