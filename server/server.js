// Create express app
const express = require('express')
const app = express()

// Database connection
const dbConnect = require('./config/database')
dbConnect()

// Enable cross origin 
const cors = require("cors");
app.use(cors({
    // origin: process.env.DEPLOYMENT_CLIENT_URI,
    origin: process.env.LOCAL_CLIENT_URI,
    credentials: true
  }));

// Load the environment variables
require('dotenv').config()
// Enable read cookies
const cookieParser = require("cookie-parser");
app.use(cookieParser());

// Enable Parsing Request Data
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middlewares
app.use(express.static('public'))
app.use(express.json())

// Routing
const productRoutes = require('./routes/productRoutes')
app.use(productRoutes)

// Run App
app.listen(process.env.PORT, _ => console.log(`App is running on http://localhost:${process.env.PORT}`))


