const mongoose = require("mongoose");
require('dotenv').config();

const dbConnect = async (retries = 5) =>  {
  while (retries) {
    try {
      await mongoose.connect(process.env.DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 10000,
        socketTimeoutMS: 60000,
        loggerLevel: 'debug',
      });
      console.log("Connected to database");
      break;
    } catch (error) {
      console.error("Database connection error:", error.message);
      retries -= 1;
      console.log(`Retries left: ${retries}`);
      if (!retries) {
        throw new Error('Could not connect to the database after several attempts');
      }
      await new Promise(res => setTimeout(res, 5000)); // Wait 5 seconds before retrying
    }
  }
}

module.exports = dbConnect;
