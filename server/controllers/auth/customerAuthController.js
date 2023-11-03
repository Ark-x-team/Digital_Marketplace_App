const Customer = require("../../models/Customer"); 
const User = require("../../models/User"); 
const bcrypt = require('bcrypt') 
const xss = require('xss');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const MailGen = require('mailgen');

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
        //Check users accounts
        const userExist = await User.findOne({ $or: [{ email }, { username }] })
        const customerExist = await Customer.findOne({ $or: [{ email }, { username }] });
        if (userExist) {
            res.status(403).json({ status: 401, message: "Can't create account for admin or managers" })
        } else {
            if (customerExist) {
                return res.status(400).json({
                    status: 400,
                    message: "Customer already exists, check your email or username"
                })
            } else {
                const salt = await bcrypt.genSalt();
                const hashedPassword = bcrypt.hashSync(sanitizedData.password, salt)
                //Post customer data
                await Customer.create(
                    {
                        username: sanitizedData.username,
                        email: sanitizedData.email,
                        password: hashedPassword
                    })
                const customer = await Customer.findOne({ email });
                    
                // Set hash algorithm
                const header = { algorithm: process.env.ALG }
                              
                // Verification token expiration : 1h
                const verificationTokenExp = 1000 * 60 * 60 ;
                    
                // Generate access token
                const verificationToken = await jwt.sign({
                    // Payload
                    id: customer.id,
                    exp: Date.now() + verificationTokenExp
                },
                process.env.ACCESS_TOKEN_SECRET, header)
                    
                // Set transporter configuration
                const transporterConfig = {
                    service: 'gmail',
                    auth: {
                        user: process.env.EMAIL,
                        pass: process.env.PASS,
                    },
                }
                const transporter = nodemailer.createTransport(transporterConfig);
            
                // Create instance of MailGen
                const MailGenerator = new MailGen({
                    theme: "default",
                    product: {
                        name: "Markstone",
                        link: "https://mailgen.js/"
                    }
                })
            
                // Set mail message properties
                const messageTemplate = {
                    body: {
                        name: username,
                        logo: 'https://mailgen.js/img/logo.png',
                        link: 'https://mailgen.js/',
                        intro: `Email confirmation`,
                        action: {
                            instructions: 'To verify your email address, please click here',
                            button: {
                                color: '#22BC66',
                                text: 'Verify',
                                link: `http://localhost:${process.env.PORT}/customers/email-verify?token=${verificationToken}`
                            }
                        },
                        outro: "This email is automatically generated. Please do not answer it."
                    }
                } 
                // Generate the email
                const mail = MailGenerator.generate(messageTemplate)
            
                // Set mail config
                const mailConfig = {
                    from: process.env.EMAIL,
                    to: email,
                    subject: 'Markstone website customers',
                    html: mail
                }
            
                // Send the email
                try {
                    await transporter.sendMail(mailConfig);
                    res.status(201).json({
                        status: 201,
                        msg: "Check your email to verify your account"
                    })
                } catch (error) {
                    return res.status(500).json({ error: error.message });
                }
            }
        }
    } catch(error){
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
        const customer = await Customer.findOne({ email })
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
                        username: customer.username,
                        role: "customer",
                        exp: Date.now() + accessTokenExp
                    },
                        process.env.ACCESS_TOKEN_SECRET, header)
    
                    // Refresh token expiration : 30 days
                    const refreshTokenExp = 30 * 24 * 60 * 60 * 1000 ;
                    
                    // Generate refresh token
                    const refreshToken = await jwt.sign({
                        // Payload
                        id: customer._id,
                        exp: Date.now() + refreshTokenExp
                    },
                        process.env.REFRESH_TOKEN_SECRET, header)
    
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

const resetPasswordVerify = async (req, res) => {
    try {
        // Get customer data
        const { email } = req.body;
        
        // Check customer existence and account validity 
        const customer = await Customer.findOne({ email })
        if (customer && customer.valid_account) {
            // Set hash algorithm
            const header = { algorithm: process.env.ALG }
                              
            // Verification token expiration : 10 min
            const verificationTokenExp = 1000 * 60 * 10 ;
                
            // Generate access token
            const verificationToken = await jwt.sign({
                // Payload
                id: customer.id,
                exp: Date.now() + verificationTokenExp
            },
            process.env.ACCESS_TOKEN_SECRET, header)
                
            // Set transporter configuration
            const transporterConfig = {
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL,
                    pass: process.env.PASS,
                },
            }
            const transporter = nodemailer.createTransport(transporterConfig);
        
            // Create instance of MailGen
            const MailGenerator = new MailGen({
                theme: "default",
                product: {
                    name: "Markstone",
                    link: "https://mailgen.js/"
                }
            })
        
            // Set mail message properties
            const messageTemplate = {
                body: {
                    name: customer.username,
                    logo: 'https://mailgen.js/img/logo.png',
                    link: 'https://mailgen.js/',
                    intro: `Password reset`,
                    action: {
                        instructions: 'To reset your password, please click here',
                        button: {
                            color: '#22BC66',
                            text: 'Reset password',
                            link: `http://localhost:${process.env.PORT}/customers/reset-password?token=${verificationToken}`
                        }
                    },
                    outro: "This email is automatically generated. Please do not answer it."
                }
            } 
            // Generate the email
            const mail = MailGenerator.generate(messageTemplate)
        
            // Set mail config
            const mailConfig = {
                from: process.env.EMAIL,
                to: email,
                subject: 'Markstone website customers',
                html: mail
            }
        
            // Send the email
            try {
                await transporter.sendMail(mailConfig);
                res.status(201).json({
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
