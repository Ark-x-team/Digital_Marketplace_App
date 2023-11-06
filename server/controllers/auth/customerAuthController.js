// Models & utils 
const Customer = require("../../models/Customer"); 
const User = require("../../models/User"); 
const mail = require('../../utils/mail/mail') 
const template = require('../../utils/mail/templates')
const token = require('../../utils/token') 

// Modules
const bcrypt = require('bcrypt') 
const xss = require('xss'); 

// ****************************** Sign up **********************************
const customerSignup = async (req, res) => {
    try {
        // Get customer input data
        const usernameInput = req.body.username ;
        const emailInput = req.body.email ;
        const passwordInput = req.body.password ;

        // Sanitize the user input
        const sanitizedData = {
            username: xss(usernameInput),
            email: xss(emailInput),
            password: xss(passwordInput),
        };
        const {username, email, password} = sanitizedData
        // Check users and customers accounts
        const userExist = await User.findOne({ $or: [{ email }, { username }] })
        const customerExist = await Customer.findOne({ $or: [{ email }, { username }] });
        if (userExist) {
            res.status(403).json({ status: 401, message: "Can't create account for admin or manager" })
        } else {
            if (customerExist) {
                return res.status(400).json({
                    status: 400,
                    message: "Customer already exists, check your email or username"
                })
            } else {
                // Hashing the password
                const salt = await bcrypt.genSalt();
                const hashedPassword = bcrypt.hashSync(password, salt)

                // Post customer data
                await Customer.create({ username, email, password: hashedPassword })

                // Get the created customer
                const customer = await Customer.findOne({ email });
                    
                // Generate verification token
                const verificationToken = await token.verificationToken(customer.id)

                // Set message template for the mail verification
                const messageTemplate = await template.verifyEmail(username, verificationToken, "customers")

                // Send mail
                try {   
                    await mail.sendMail(email, messageTemplate)
                    return res.status(201).json({
                        status: 201,
                        msg: "Check your email to verify your account"
                    })
                } catch (error) {
                    console.log(error);
                    return res.status(500).json({ error: error.message });
                }
            }
        }
    } catch(error){
        res.status(400).json({status: 400, message: "Failed to create account"})
    }
}

// ****************************** Login ************************************
const customerLogin = async (req, res) => {
    try {
         // Get customer input data
         const emailInput = req.body.email ;
         const passwordInput = req.body.password ;
 
         // Sanitize the user input
         const sanitizedData = {
             email: xss(emailInput),
             password: xss(passwordInput),
         };
         const {email, password} = sanitizedData
        
        // Check customer existence and account validity 
        const customer = await Customer.findOne({ email })
            if (customer && customer.valid_account) {

                // Compare password
                const passwordMatch = bcrypt.compareSync(password, customer.password);
                if (passwordMatch) {
                  
                    // Access token expiration : 15 min
                    const accessTokenExp = 1000 * 60 * 15 ;
                    
                    // Generate access token
                    const accessToken = await token.accessToken(customer.id, customer.username, "customer")
    
                    // Generate refresh token
                    const refreshToken = await token.refreshToken(customer.id, customer.username, "customer")
    
                    // Pass data in http headers
                    res.set({
                        "access_token": accessToken,
                        "token_type": "Bearer",
                        "expires_in": accessTokenExp,
                        "refresh_token": refreshToken
                    })
    
                    // Set current date to last_login
                    const lastLogin = Date.now();
                    await Customer.findByIdAndUpdate(customer._id, { last_login: lastLogin })
                    res.status(200).json({ status: 200, message: "login success", customer })
    
                } else res.status(401).json({ status: 401, message: "Invalid Password" })
    
            } else res.status(401).json({ status: 401, message: "Invalid email address" })
    } catch(error){
        res.status(400).json({ status: 400, message: "Failed to login" })
        console.log(error);
    }
}

// ************************* Reset password *********************************
const resetPasswordVerify = async (req, res) => {
    try {
         // Get customer input email
         const emailInput = req.body.email ;
 
         // Sanitize the user input
         const email = xss(emailInput)
        
        // Check customer existence and account validity 
        const customer = await Customer.findOne({ email })
        if (customer && customer.valid_account) {

            // Generate verification token
            const verificationToken = await token.verificationToken(customer.id)

            // Set message template for the mail verification
            const messageTemplate = await template.resetPassword(customer.username, verificationToken)

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
        console.log(error)
    }
}

module.exports = { customerSignup, customerLogin, resetPasswordVerify };
