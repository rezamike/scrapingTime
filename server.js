var express = require("express");
var mongoose = require("mongoose");
var axios = require("axios");
var cheerio = require("cheerio");
var logger = require("morgan");

var db = require("./models");
var PORT = 3000;
var app = express();

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

var databaseUri = "mongodb://localhost/topmovies";

if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI);
}
else {
  mongoose.connect(databaseUri);
}


app.get("/scrape", function (req, res) {
  axios.get("https://www.imdb.com/chart/top?ref_=nv_mv_250").then(function (response) {
    var $ = cheerio.load(response.data);

    var results = [];

    $("tr").each(function (i, element) {
      var result = {};

      result.title = $(this).find(".titleColumn")
        .children("a")
        .text();
      result.link = $(this).find(".titleColumn")
        .children("a")
        .attr("href");
      result.image = $(this).find(".posterColumn")
        .children("a")
        .children("img")
        .attr("src")

      results.push(result);

      db.Movie.create(result)
        .then(function (dbMovie) {
          console.log(dbMovie);
        })
        .catch(function (err) {
        });
    });
    console.log(results);

  });
});

app.get("/movies", function (req, res) {
  db.Movie.find({})
    .then(function (dbMovie) {
      res.json(dbMovie);
    })
    .catch(function (err) {
      res.json(err);
    });
});

app.get("/movies/:id", function (req, res) {
  db.Movie.findOne({ _id: req.params.id })
    .populate("rating")
    .then(function (dbMovie) {
      res.json(dbMovie);
    })
    .catch(function (err) {
      res.json(err);
    });
});

app.delete("/movies/:id", function (req, res) {
  console.log(req.params.id);
  db.Rating.findByIdAndRemove({ _id: req.params.id }, function (err, dat) {
    if (err) throw err;
  });
});

app.post("/movies/:id", function (req, res) {
  db.Rating.create(req.body)
    .then(function (dbRating) {
      return db.Movie.findOneAndUpdate({ _id: req.params.id }, { rating: dbRating._id }, { new: true });
    })
    .then(function (dbMovie) {
      res.json(dbMovie);
    })
    .catch(function (err) {
      res.json(err);
    });
});

app.listen(PORT, function () {
  console.log("App running on port " + PORT + "!");
});
