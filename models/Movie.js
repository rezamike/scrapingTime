var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var MovieSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    match: [/.{6,}/]
  },
  link: {
    type: String,
    required: true,
    unique: true
  },
  image: {
      type: String,
      required: true,
      unique: true
  },
  rating: {
    type: Schema.Types.ObjectId,
    ref: "Rating"
  }
});

var Movie = mongoose.model("Movie", MovieSchema);

module.exports = Movie;
