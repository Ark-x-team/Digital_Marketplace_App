// Models & utils 
const User = require("../../models/User"); 
const mail = require('../../utils/mail/mail') 
const template = require('../../utils/mail/templates')
const token = require('../../utils/token') 

// Modules
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
            if (user.active) {
                // Compare password
                const passwordMatch = bcrypt.compareSync(password, user.password);
                if (passwordMatch) {
    
                     // Access token expiration : 15 min
                     const accessTokenExp = 1000 * 60 * 15 ;
                    
                     // Generate access token
                     const accessToken = await token.accessToken(user.id, user.username, user.role)
     
                     // Generate refresh token
                     const refreshToken = await token.refreshToken(user.id, user.username, user.role)
     
                     // Pass data in http headers
                     res.set({
                         "access_token": accessToken,
                         "token_type": "Bearer",
                         "expires_in": accessTokenExp,
                         "refresh_token": refreshToken
                     })
    
                    // Set current date to last_login
                    const lastLogin = Date.now();
                    await User.findByIdAndUpdate(user._id, { last_login: lastLogin })
                    res.status(200).json({ status: 200, message: "login success", user })
    
                } else res.status(401).json({ status: 401, message: "Invalid Password" })
    
            } else res.status(401).json({ status: 401, message: "Your account is not active" })
        } else res.status(401).json({ status: 401, message: "Invalid email address" })
    } catch(error){
        res.status(400).json({ status: 400, message: "Failed to login" })
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

module.exports = { userLogin, resetPasswordVerify };
