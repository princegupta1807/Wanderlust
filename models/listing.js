// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;
// const Review = require("./review.js");
// const { ref } = require("joi");

// // creating our schema
// const listingSchema = new Schema({
//   title: {
//     type: String,
//     required: true,
//   },

//   description: String,

//   image: {
//     url: String,
//     filename: String,
//   },

//   price: Number,
//   location: String,
//   country: String,
//   reviews: [
//     {
//       type: Schema.Types.ObjectId,
//       ref: "Review", // Here, "Review" is a model from "reviews.js"
//     },
//   ],
//   owner: {
//     type: Schema.Types.ObjectId,
//     ref: "User", // Here, "User" is a model from "user.js"

//     // As "owner" data was not there in our listing database(data.js), we've to include owner data in it
//   },
// });

// listingSchema.post("findOneAndDelete", async (listing) => {
//   if (listing) {
//     await Review.deleteMany({ _id: { $in: listing.reviews } });
//     // This deletes all reviews associated with the deleted listing.
//   }
// });

// // creating a model based on this schema-
// const Listing = mongoose.model("listing", listingSchema);
// module.exports = Listing;

const mongoose = require("mongoose");
const review = require("./review");
const Schema = mongoose.Schema;
const Review = require("./review");

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
  price: {
    type: Number,
    required: [true, "Price per night is required"],
    min: [0, "Price cannot be negative"],
  },
  location: {
    type: String,
    required: [true, "Location is required"],
    trim: true,
    minlength: [2, "Location must be at least 2 characters long"],
  },
  country: {
    type: String,
    required: [true, "Country is required"],
    trim: true,
    minlength: [2, "Country name must be at least 2 characters long"],
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  geometry: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
});

listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    await Review.deleteMany({ _id: { $in: listing.reviews } });
  }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
