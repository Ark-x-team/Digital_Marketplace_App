const Customer = require("../../models/Customer"); 
const User = require("../../models/User"); 
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt') 

const accountVerification = async (req, res) => {
    try {
        verificationToken = req.query.token

        if (verificationToken) {
            // Decode the access token
            const decoded = await jwt.verify(verificationToken, process.env.ACCESS_TOKEN_SECRET)

            const customer = await Customer.findById(decoded.id)

            if (customer) {
                if (customer.valid_account) {
                    res.status(400).json({ status: 400, message: "This email is already validated" })
                } else {
                    const valid_account = true 

                    await Customer.findByIdAndUpdate(decoded.id, { valid_account })

                    res.status(200).json({
                        status: 200,
                        msg: "Your account has been verified"
                    })
                }
            } else res.status(404).json({ status: 404, message: "invalid customer id" })
        
        } else res.status(403).json({ status: 403, message: "Token missing" })
    } catch (error) {
        res.status(500).json({
            status: 500,
            msg: "Failed to verify your account"
        })
        console.log(error);
   }
}

const customerResetPassword = async (req, res) => {
    try {
        verificationToken = req.query.token

        if (verificationToken) {
            // Decode the access token
            const decoded = await jwt.verify(verificationToken, process.env.ACCESS_TOKEN_SECRET)

            const customer = await Customer.findById(decoded.id)

            if (customer) {
                if (Date.now() > decoded.exp) {
                    res.status(401).json({ status: 401, message: "Token expired" })
                } else {
                    const { newPassword } = req.body;

                    // Password hashing
                    const salt = await bcrypt.genSalt();
                    const hashedPassword = bcrypt.hashSync(newPassword, salt)
                    
                    await Customer.findByIdAndUpdate(customer.id, { password: hashedPassword })

                    res.status(200).json({
                        status: 200,
                        msg: "Your password has been updated"
                    })
                }
            } else res.status(404).json({ status: 404, message: "invalid customer id" })
        
        } else res.status(403).json({ status: 403, message: "Token missing" })
    } catch (error) {
        res.status(500).json({
            status: 500,
            msg: "Failed to reset password"
        })
        console.log(error);
   }
}

const userResetPassword = async (req, res) => {
    try {
        verificationToken = req.query.token

        if (verificationToken) {
            // Decode the access token
            const decoded = await jwt.verify(verificationToken, process.env.ACCESS_TOKEN_SECRET)

            const user = await User.findById(decoded.id)

            if (user) {
                if (Date.now() > decoded.exp) {
                    res.status(401).json({ status: 401, message: "Token expired" })
                } else {
                    const { newPassword } = req.body;

                    // Password hashing
                    const salt = await bcrypt.genSalt();
                    const hashedPassword = bcrypt.hashSync(newPassword, salt)
                    
                    await User.findByIdAndUpdate(user.id, { password: hashedPassword })

                    res.status(200).json({
                        status: 200,
                        msg: "Your password has been updated"
                    })
                }
            } else res.status(404).json({ status: 404, message: "invalid user id" })
        
        } else res.status(403).json({ status: 403, message: "Token missing" })
    } catch (error) {
        res.status(500).json({
            status: 500,
            msg: "Failed to reset password"
        })
        console.log(error);
   }
}

module.exports = { accountVerification, customerResetPassword, userResetPassword };