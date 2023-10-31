const jwt = require('jsonwebtoken');
const Customer = require('../models/Customer')

const authMiddleware = async (req, res, next) => {
    try{
        // Read access token off cookies
        const accessToken = req.cookies.accessToken; 

        // Decode the access token
        const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)

        // Check expiration 
        if(Date.now() > decoded.exp) {
            res.status(401).json({ status: 401, message: "Token expired" })
        } else {
            
            // Find customer using decoded id
            const customer = await Customer.findById(decoded.id)
            if (customer && customer.valid_account) {
                
                // attach user to req
                req.customer = customer
                next()  
            } else {
                res.status(400).json({ status: 400, message: "Customer not found" })
            }
        }
    } catch(err) {
        res.status(400).json({ status: 400, message: "Customer not connected" })
    }
}



module.exports = authMiddleware