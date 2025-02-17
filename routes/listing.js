const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer = require("multer"); // for parsing form data
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage }); // multer will save our file in "storage" of cloudinary

router.route("/").get(wrapAsync(listingController.index)).post(
  isLoggedIn,
  upload.single("listing[image]"), // multer will process the image file & bring it in req.file
  validateListing,
  wrapAsync(listingController.createListing),
);

// NEW ROUTE: to create new listings
router.get("/new", isLoggedIn, listingController.renderNewForm);

router
  .route("/:id")
  .get(wrapAsync(listingController.showListings))
  .put(
    isLoggedIn, // Authentication middleware
    isOwner, // Authorization middleware
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.updateListing),
  )
  .delete(isOwner, isLoggedIn, wrapAsync(listingController.destoryListing));

// EDIT ROUTE: to edit a particular listing
router.get(
  "/:id/edit",
  isOwner,
  isLoggedIn,
  wrapAsync(listingController.renderEditForm),
);

module.exports = router;
