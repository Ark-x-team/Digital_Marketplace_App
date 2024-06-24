const mongoose = require("mongoose");
require('dotenv').config();

const dbConnect = async () =>  {
  try {
    await mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // Timeout after 5s if MongoDB server is not found
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
      retryWrites: true, // Enable automatic retries
    });
    console.log("Connected to database");
  } catch (error) {
    console.error("Database connection error:", error.message);
  }
}

module.exports = dbConnect;
