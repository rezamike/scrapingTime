var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new NoteSchema object
// This is similar to a Sequelize model
var RatingSchema = new Schema({
  // `title` is of type String
  title: String,
  // `body` is of type String
  body: String,
  // `rating` is an integer out of five
  ratingNum: {
      type: Number,
      required: true,
      match: [/12345.{,6}/, "Only one number allowed out of 5"]
  }
});

// This creates our model from the above schema, using mongoose's model method
var Rating = mongoose.model("Rating", RatingSchema);

// Export the Note model
module.exports = Rating;
