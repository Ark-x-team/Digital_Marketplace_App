// Models & utils 
const Customer = require("../../models/Customer"); 
const User = require("../../models/User"); 
const mail = require('../../utils/mail/mail') 
const template = require('../../utils/mail/templates')
const token = require('../../utils/token') 
const axios = require('axios');
const { OAuth2Client } = require('google-auth-library');

// Modules
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt') 
const xss = require('xss'); 

// ****************************** Sign up **********************************
const customerSignup = async (req, res) => {
    try {
        // Get customer input data
        const usernameInput = req.body.username ;
        const emailInput = req.body.email ;
        const passwordInput = req.body.password;
        const captchaToken = req.body.recaptchaValue;

        const recaptchaRes = await axios.post(
        `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${captchaToken}`
        );

        if (recaptchaRes) {
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
                        message: "Account already exists, check your email or username"
                    })
                } else {
                    // Hashing the password
                    const salt = await bcrypt.genSalt();
                    const hashedPassword = bcrypt.hashSync(password, salt)
                
                    // Post customer data
                    await Customer.create({ username, email, password: hashedPassword })
                
                    // Get the created customer
                    const customer = await Customer.findOne({ email });
                
                    const mainToken = await token.mainToken(customer.id, customer.username,
                    "customer")
                    
                    // Set message template for the mail verification
                    const messageTemplate = await template.verifyEmail(username, mainToken)
                    
                    // Send mail
                    try {   
                        await mail.sendMail(email, messageTemplate)
                        return res.status(201).json({
                        status: 201,
                        message: "Account created successfully, check your email to verify your account"
                    })
                    } catch (error) {
                        return res.status(500).json({ error: error.message });
                    }
                }
            }
        } else res.status(403).json({ status: 400, message: "Bots are not allowed!" })
    } catch(error){
        res.status(400).json({ status: 400, message: "Failed to create account" })
    }
}

// ****************************** Login ************************************
const customerLogin = async (req, res) => {
    try {
        // Get customer input data
        const emailInput = req.body.email ;
        const passwordInput = req.body.password;
        const captchaToken = req.body.recaptchaValue;

        const recaptchaRes = await axios.post(
        `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${captchaToken}`
        );
        if (recaptchaRes) {
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

                    // Generate access token
                    const mainToken = await token.mainToken(customer.id, customer.username,
                    "customer")
   
                    // Pass data in http headers
                    res.set({
                        "access_token": mainToken,
                        "token_type": "Bearer",
                        "Access-Control-Expose-Headers": "access_token, token_type"
                    })

                    // Set current date to last_login
                    const lastLogin = Date.now();

                    await Customer.findByIdAndUpdate(customer._id, { last_login: lastLogin })
                        res.status(200).json({
                        status: 200, message: "login success", customer
                    })
   
                } else res.status(401).json({ status: 401, message: "Invalid Password" })
            } else res.status(401).json({ status: 401, message: "Invalid email address" })
        } else res.status(403).json({ status: 400, message: "Bots are not allowed!" })
    } catch(error){
        res.status(400).json({ status: 400, message: "Failed to login" })
        console.log(error);
    }
}

// ************************ Login with google ******************************
const customerGoogleLogin = async (req, res) => {
    try {
        const credential = req.body.credential
        if (credential) {  
            const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
            const ticket = await client.verifyIdToken({
                idToken: credential,
                audience: process.env.GOOGLE_CLIENT_ID,
            });
            const email = ticket.getPayload().email;
            const customer = await Customer.findOne({ email })
            if (customer && customer.valid_account) {
                // Generate access token
                const mainToken = await token.mainToken(customer.id, customer.username,
                    "customer")
   
                    // Pass data in http headers
                    res.set({
                        "access_token": mainToken,
                        "token_type": "Bearer",
                        "Access-Control-Expose-Headers": "access_token, token_type, expires_in"
                    })

                    // Set current date to last_login
                    const lastLogin = Date.now();

                    await Customer.findByIdAndUpdate(customer._id, { last_login: lastLogin })
                        res.status(200).json({
                        status: 200, message: "login success", customer
                    })
            } else res.status(400).json({
                status: 400,
                message: "Account not found"
            }) 
        } else res.status(404).json({ status: 403, message: "invalid credentials" })
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: "Failed to login"
        })
        console.log(error);
    }
}

// *********************** Account verification ****************************
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
                        message: "Your account has been verified"
                    })
                }
            } else res.status(404).json({ status: 404, message: "invalid customer id" })
        
        } else res.status(403).json({ status: 403, message: "Token missing" })
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: "Failed to verify your account"
        })
        console.log(error);
   }
}

// ************************* Reset password ********************************
const resetPasswordVerification = async (req, res) => {
    try {
         // Get customer input email
         const emailInput = req.body.email ;
 
         // Sanitize the user input
         const email = xss(emailInput)
        
        // Check customer existence and account validity 
        const customer = await Customer.findOne({ email })
        if (customer && customer.valid_account) {

            // Verification token expiration : 10 min
            const exp =  1000 * 60 * 5;

            // Generate verification token
            const mainToken = await token.mainToken(customer.id, customer.username,
                "customer", Date.now() + exp)

            // Set message template for the mail verification
            const messageTemplate = await template.resetPassword(customer.username ,mainToken)

            // Send mail
            try {   
                await mail.sendMail(email, messageTemplate)
                return res.status(201).json({
                    status: 201,
                    message: "Check your email to reset your password"
                })
            } catch (error) {
                return res.status(500).json({ error: error.message });
            }
        } else res.status(404).json({ status: 404, message: "This account does not exist" })
    } catch (error) {
        res.status(400).json({ status: 400, message: "Failed to reset password" })
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
                    res.status(401).json({ status: 401, message: "Session expired" })
                } else {
                    const { newPassword } = req.body;

                    // Password hashing
                    const salt = await bcrypt.genSalt();
                    const hashedPassword = bcrypt.hashSync(newPassword, salt)
                    
                    await Customer.findByIdAndUpdate(customer.id, { password: hashedPassword })
                    res.status(200).json({
                        status: 200,
                        message: "Your password has been updated"
                    })
                }
            } else res.status(404).json({ status: 404, message: "Invalid account" })
        
        } else res.status(403).json({ status: 403, message: "Please verify your email before proceeding with the password reset." })
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: "Session expired"
        })
        console.log(error);
   }
}

// ****************************** Logout ***********************************
const customerLogout = async (req, res) => {
    try {   
        // Retrieve the cookie
        const cookieToken = req.cookies.token

        // Check occurrence of the token cookie.
        if (!cookieToken) {
            res.status(201).json({ status: 201, message: "Customer is not connected" })

        } else {
            const decoded = jwt.verify(cookieToken, process.env.ACCESS_TOKEN_SECRET)
            const customer = await Customer.findById(decoded.id )
            if (!customer) {
                res.status(201).json({ status: 201, message: "Customer is not connected" })
            } else {
                res.clearCookie('token', {
                    httpOnly: true, maxAge: 0, // secure: true
                }) 
                res.status(200).json({ status: 200, message: "Customer logout successfully" })
            }
        }
    } catch (error) {
        res.status(500).json({ status: 500, message: "Internal Server Error" });
    } 
}

function checkAuth(req, res) {
    try{
      res.sendStatus(200)
    } catch(err){
      return res.sendStatus(400)
    }
  }
  
module.exports = { customerSignup, customerLogin, customerGoogleLogin, customerLogout, resetPasswordVerification, accountVerification, customerResetPassword, checkAuth};
