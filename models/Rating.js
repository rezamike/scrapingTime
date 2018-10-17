var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var RatingSchema = new Schema({
  title: String,
  body: String,
});

var Rating = mongoose.model("Rating", RatingSchema);

module.exports = Rating;
