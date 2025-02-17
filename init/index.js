const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

async function main() {
  mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}

main()
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

// initializing out DB
const initDB = async () => {
  await Listing.deleteMany({}); // cleaning previous listings from our DB
  initData.data = initData.data.map((obj) => ({
    ...obj,
    owner: "67acf6c0d41c3b64729055b7",
  }));

  await Listing.insertMany(initData.data); // inserting new data in DB
  console.log("Data was initialised");
};

initDB();
