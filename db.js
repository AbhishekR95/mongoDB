const mongoose = require("mongoose");
require("dotenv").config();

// define MongoDB connection URL
// const mongoURL = process.env.MONGODB_URL;
const mongoURL = process.env.MONGODB_URL_LOCAL;

// setup mongoose connection
mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Get default connection - mongoose maintains a default conneciton object representing the MongoDB connection
const db = mongoose.connection;

// define event listeners for database connection
db.on("connected", () => {
  console.log("Connected to MongoDB server");
});
db.on("error", (err) => {
  console.log("Error to MongoDB server", err);
});
db.on("disconnected", () => {
  console.log("MongoDB server disconnected");
});

// Export the connection
module.exports = db;
