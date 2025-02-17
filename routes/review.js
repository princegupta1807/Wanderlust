const express = require("express");
const router = express.Router({ mergeParams: true });
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
const wrapAsync = require("../utils/wrapAsync.js");
const {
  validateReviews,
  isLoggedIn,
  isReviewAuthor,
} = require("../middleware.js");

const reviewsController = require("../controllers/reviews.js");

// REVIEWS ROUTE(POST): For posting reviews for each listings
router.post(
  "/",
  isLoggedIn,
  validateReviews,
  wrapAsync(reviewsController.createReview),
);

router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  wrapAsync(reviewsController.destroyReview),
);

module.exports = router;
