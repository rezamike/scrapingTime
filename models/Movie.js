var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
var MovieSchema = new Schema({
  // `title` is required and of type String
  title: {
    type: String,
    required: true,
    unique: true,
    match: [/.{6,}/]
  },
  // `link` is required and of type String
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
  // `note` is an object that stores a Note id
  // The ref property links the ObjectId to the Note model
  // This allows us to populate the Article with an associated Note
  rating: {
    type: Schema.Types.ObjectId,
    ref: "Rating"
  }
});

// This creates our model from the above schema, using mongoose's model method
var Movie = mongoose.model("Movie", MovieSchema);

// Export the Article model
module.exports = Movie;
