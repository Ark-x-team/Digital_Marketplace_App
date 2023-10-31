const Customer = require("../../models/Customer"); // Import customer Model
const bcrypt = require('bcrypt') 
const xss = require('xss');
const jwt = require('jsonwebtoken');

// ****************************** Sign up **********************************
const customerSignup = async (req, res) => {
    // Get customer data
    const { username, email, password } = req.body;

    // Sanitize the user input
    const sanitizedData = {
        username: xss(username),
        email: xss(email),
        password: xss(password),
      };
    try {
        const customerExist = await Customer.findOne({ $or: [{ email }, { username }] });
        if (customerExist) {
            return res.status(400).json({
                status: 400,
                message: "Customer already exists, check your email or username"
            })
        } else {
                const salt = await bcrypt.genSalt();
                const hashedPassword = bcrypt.hashSync(sanitizedData.password, salt)
                // Post customer data
            const customer = await Customer.create(
                {
                    username: sanitizedData.username,
                    email: sanitizedData.email,
                    password: hashedPassword
                })
                res.status(200).json({ status: 200, message: "Account created successfully" })
        }
    }catch(error){
        console.log(error);
        res.status(400).json({status: 400, message: "Failed to create account"})
    }
}

// ****************************** Login ************************************
const customerLogin = async (req, res) => {
    try {
        // Get customer data
        const { email, password } = req.body;
        
        // Check customer existence and account validity
        const customer = await Customer.findOne({email})
        if (customer && customer.valid_account) {

            // Compare password
            const passwordMatch = bcrypt.compareSync(password, customer.password);
            if (passwordMatch) {

                // Set hash algorithm 
                const header = { algorithm: process.env.ALG }
              
                // Access token expiration : 15 min
                const accessTokenExp = 1000 * 60 * 15 ;
                
                // Generate access token
                const accessToken = await jwt.sign({
                    // Payload
                    id: customer._id,
                    exp: Date.now() + accessTokenExp
                },
                    process.env.ACCESS_TOKEN_SECRET, header)

                // Store access token in cookie
                res.cookie("accessToken", accessToken, {
                    maxAge : accessTokenExp,
                    httpOnly : true,
                    sameSite : "lax", // helps prevent Cross-Site Request Forgery (CSRF) attacks.
                    secure : true, // makes sure cookies are only sent with a request to an HTTPS page.
                })

                // Refresh token expiration : 30 days
                const refreshTokenExp = 30 * 24 * 60 * 60 * 1000 ;
                
                // Generate refresh token
                const refreshToken = await jwt.sign({
                    // Payload
                    id: customer._id,
                    exp: Date.now() + refreshTokenExp
                },
                    process.env.REFRESH_TOKEN_SECRET, header)

                // Store refresh token in cookie
                res.cookie("refreshToken", refreshToken, {
                    maxAge : refreshTokenExp,
                    httpOnly : true,
                    sameSite : "lax", // helps prevent Cross-Site Request Forgery (CSRF) attacks.
                    secure : true, // makes sure cookies are only sent with a request to an HTTPS page.
                })

                // Set headers
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

// ********************** Check authentication ******************************
const checkAuth = (req, res) => {
    try{
        res.status(200).json({ status: 200, message: "Customer connected" })
    } catch(error){
        res.status(400).json({ status: 400, message: "Customer not connected" })
    }
}

// ******************************* Logout **********************************
const customerLogout = (req, res) => {
    try {
        res.cookie("accessToken", "", { maxAge: 0 });
        res.cookie("refreshToken", "", { maxAge: 0 });
        res.status(200).json({ status: 200, message: "Logout successfully" })
      } catch (error) {
        res.status(400).json({ status: 200, message: "Failed to logout" })
      }
  }

module.exports = { customerSignup, customerLogin, checkAuth, customerLogout };
