const mongoose = require("mongoose");
const Movie = require("../models/movieModel");
mongoose.set("strictQuery", false);
const connectToDatabase = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://admin:admin@mvie.e5krjdy.mongodb.net/Mvie?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("Connect to MongoDB");
  } catch (e) {
    console.error("Error connecting to MongoDB:", e);
  }
};
module.exports = connectToDatabase;
