const jwt = require('jsonwebtoken');
const Customer = require('../models/Customer')

const validAccount = async (req, res, next) => {
    try{
        // Read access token from headers
        const accessToken =  req.header("authorization");

        // Decode the access token
        const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
        
        // Find customer and check role
        const customer = await Customer.findById(decoded.id)
        
        // Check account validation
        if (customer && customer.valid_account) {

            // Check expiration 
            if(Date.now() > decoded.exp) {
                res.status(401).json({ status: 401, message: "Token expired" })
            } else next()
        } else {
            res.status(403).json({ status: 403, message: "Your account email not valid" })
        }
    } catch(error) {
        res.status(400).json({ status: 400, message: "Account validation error" })
    }
}

module.exports = { validAccount }