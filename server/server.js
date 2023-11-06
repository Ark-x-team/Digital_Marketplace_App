// Create express app
const express = require('express')
const app = express()

// ******************************** App security ********************************

// Protect from some well-known web vulnerabilities
const helmet = require('helmet')
app.use(helmet())

// Disable that the application is powered by Express js
app.disable('x-powered-by')

// Protect from HTTP Parameter Pollution attacks
const hpp = require('hpp')
app.use(hpp())

// Remove any keys in request object that begin with a '$' or contain '.'
const mongoSanitize = require('express-mongo-sanitize');
app.use(mongoSanitize());

// Limit repeated requests to public APIs
const rateLimit = require('express-rate-limit')
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
})
app.use(limiter)

// ********************************* App config ********************************

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
app.use(bodyParser.urlencoded({ extended: false }));

// Middlewares
app.use(express.static('public'))
app.use(express.json())

// ********************************* App routing ********************************

const productRoutes = require('./routes/productRoutes')
const userRoutes = require('./routes/userRoutes')
const customerRoutes = require('./routes/customerRoutes')
const categoryRoutes = require('./routes/categoryRoutes')
const subcategoryRoutes = require('./routes/subcategoryRoutes')
const orderRoutes = require('./routes/orderRoutes')
app.use(productRoutes)
app.use(userRoutes)
app.use(customerRoutes)
app.use(categoryRoutes)
app.use(subcategoryRoutes)
app.use(orderRoutes)

// Run App
app.listen(process.env.PORT, _ => console.log(`App is running on http://localhost:${process.env.PORT}`))


