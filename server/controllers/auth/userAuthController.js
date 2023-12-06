// Models & utils 
const User = require("../../models/User"); 
const mail = require('../../utils/mail/mail') 
const template = require('../../utils/mail/templates')
const token = require('../../utils/token') 

// Modules
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt') 
const xss = require('xss'); 

// ****************************** Login ************************************
const userLogin = async (req, res) => {
    try {
        // Get user input data
        const emailInput = req.body.email ;
        const passwordInput = req.body.password ;

        // Sanitize the user input
        const sanitizedData = {
            email: xss(emailInput),
            password: xss(passwordInput),
        };
        const { email, password} = sanitizedData
        
        // Check user existence and account validity
        const user = await User.findOne({ email })
        if (user) {
            // Compare password
            const passwordMatch = bcrypt.compareSync(password, user.password);
            if (passwordMatch) {
                    
                // Generate access token
                const accessToken = await token.accessToken(user.id, user.username, user.role)
     
                // Generate refresh token
                const refreshToken = await token.refreshToken(user.id, user.username, user.role)
     
                // Pass data in http headers
                res.set({
                    "token_type": "Bearer",
                    "refresh_token": refreshToken,
                    "Access-Control-Expose-Headers": "access_token, refresh_token, token_type"
                })
    
                // Set current date to last_login
                const lastLogin = Date.now();
                await User.findByIdAndUpdate(user._id, { last_login: lastLogin, refresh_token: refreshToken })
                res.status(200).json({ status: 200, message: "login success", accessToken, user })
    
            } else res.status(401).json({ status: 401, message: "Invalid Password" })
        } else res.status(401).json({ status: 401, message: "Invalid email address" })
    } catch(error){
        res.status(400).json({ status: 400, message: "Failed to login" })
        console.log(error);

    }
}

// ************************* Reset password ********************************
const resetPasswordVerify = async (req, res) => {
    try {
        // Get user input data
        const emailInput = req.body.email ;

        // Sanitize the user input
        const email = xss(emailInput)
        
        // Check user existence and account validity 
        const user = await User.findOne({ email })
        if (user) {
            // Generate verification token
            const verificationToken = await token.verificationToken(user.id)

            // Set message template for the mail verification
            const messageTemplate = await template.resetPassword(user.username, verificationToken, "users")
 
            // Send mail
            try {   
                await mail.sendMail(email, messageTemplate)
                return res.status(201).json({
                    status: 201,
                    msg: "Check your email to reset your password"
                })
            } catch (error) {
                return res.status(500).json({ error: error.message });
            }
            
        } else res.status(404).json({ status: 404, message: "customer does not exist" })
    } catch (error) {
        res.status(400).json({ status: 400, message: "Failed to reset password" })
    }
}

const userResetPassword = async (req, res) => {
    try {
        verificationToken = req.query.token
        console.log(verificationToken);

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

// *********************** Get new access token ****************************
const getAccessToken = async (req, res) => {
    try {
        // Retrieve refresh token from client
        const refreshToken = req.body.refreshToken
        
        // Check occurrence of the token cookie.
        if (!refreshToken) {
            res.status(401).json({ status: 401, message: "You must to be connected" })
        } else {
            const user = await User.findOne({ refresh_token: refreshToken })
            if (!user) {
                res.status(403).json({ status: 403, message: "You don't have enough privilege" })
            } else {
                jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET,
                    async (error, decoded) => {
                        if (error || user.id !== decoded.id) {
                            res.status(403).json({ status: 401, message: "Invalid or expired token" })
                        } else {
                            const accessToken = await token.accessToken(decoded.id, decoded.username, decoded.role)
                            res.status(200).json({ accessToken, role: decoded.role })
                        }
                    }
                )
            }
            
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({ status: 400, message: "Failed to generate new access token" })
    }
}

module.exports = { userLogin, resetPasswordVerify, userResetPassword, getAccessToken };
