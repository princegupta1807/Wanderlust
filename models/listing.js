const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");
const { ref } = require("joi");

// creating our schema
const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },

  description: String,

  image: {
    url: String,
    filename: String,
  },

  price: Number,
  location: String,
  country: String,
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review", // Here, "Review" is a model from "reviews.js"
    },
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User", // Here, "User" is a model from "user.js"

    // As "owner" data was not there in our listing database(data.js), we've to include owner data in it
  },
});

listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    await Review.deleteMany({ _id: { $in: listing.reviews } });
    // This deletes all reviews associated with the deleted listing.
  }
});

// creating a model based on this schema-
const Listing = mongoose.model("listing", listingSchema);
module.exports = Listing;
