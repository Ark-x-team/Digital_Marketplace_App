const jwt = require('jsonwebtoken');
const User = require('../models/User')
const Customer = require('../models/Customer')

const adminRole = async (req, res, next) => {
    try{
        // Read access token from headers
        const accessToken =  req.header("authorization");

        // Decode the access token
        const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)

        // Find user and check role
        const user = await User.findById(decoded.id)
        if (user && decoded.role === "admin") {

            // Check expiration 
            if(Date.now() > decoded.exp) {
                res.status(401).json({ status: 401, message: "Token expired" })
            } else next()
        } else {
            res.status(403).json({ status: 403, message: "You don't have enough privilege" })
        }
    } catch(error) {
        res.status(400).json({ status: 400, message: "Bad request" })
    }
}

const userRole = async (req, res, next) => {
    try{
        // Read access token from headers
        const accessToken =  req.header("authorization")

        // Decode the access token
        const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)

        // Find user and check role
        const user = await User.findById(decoded.id)
        if (user && decoded.role === "admin" || decoded.role === "manager") {

            // Check expiration 
            if(Date.now() > decoded.exp) {
                res.status(401).json({ status: 401, message: "Token expired" })
            } else next()
        } else {
            res.status(403).json({ status: 403, message: "You don't have enough privilege" })
        }
    } catch(error) {
        res.status(400).json({ status: 400, message: "Bad request" })
        console.log(error) 
    }
}

const customerRole = async (req, res, next) => {
    try{
        // Read access token from headers
        const accessToken =  req.header("authorization")

        // Decode the access token
        const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)

        // Find customer and check role
        const customer = await Customer.findById(decoded.id)
        if (customer && decoded.id === customer.id && decoded.role === "customer") {
          
            // Check expiration 
            if(Date.now() > decoded.exp) {
                res.status(401).json({ status: 401, message: "Token expired" })
            } else next()
        } else {
            res.status(403).json({ status: 403, message: "You don't have enough privilege" })
        }
    } catch(error) {
        res.status(400).json({ status: 400, message: "Bad request" })
    }
}

module.exports = { adminRole, userRole, customerRole }