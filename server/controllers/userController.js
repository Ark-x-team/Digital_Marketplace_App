// Models & utils 
const User = require("../models/User"); 
const mail = require('../utils/mail/mail') 
const template = require('../utils/mail/templates')
const token = require('../utils/token') 

// Modules
const bcrypt = require('bcrypt') 
const xss = require('xss'); 

// ******************************* Add user ************************************
const addUser = async (req, res) => {
    try {
        // Get user input data
        const usernameInput = req.body.username ;
        const emailInput = req.body.email ;
        const passwordInput = req.body.password ;
        const roleInput = req.body.role ;
       
        // Sanitize the user input
        const sanitizedData = {
            username: xss(usernameInput),
            email: xss(emailInput),
            password: xss(passwordInput),
            role: xss(roleInput),
        };
        const {username, email, password, role} = sanitizedData

        // Check user existence using email
        const userExist = await User.findOne({$or: [{email}, {username}]});
        if (userExist) {
            return res.status(400).json({
                status: 400,
                message: "User already exists, check the username and the email address"
            })
        } else {
            // Password hashing
            const salt = await bcrypt.genSalt();
            const hashedPassword = bcrypt.hashSync(password, salt)

            // Post user data
            await User.create({ username, email, password: hashedPassword, role }); 
            const user = await User.findOne({ email }); 

            // Generate verification token
            const verificationToken = await token.verificationToken(user.id)

            // Set message template for the mail verification
            const messageTemplate = await template.userCredentials(username, role, email, password, verificationToken)

            // Send mail
            try {   
                await mail.sendMail(email, messageTemplate)
                return res.status(201).json({
                    status: 201,
                    msg: "A notification email is sent to the user with his credentials"
                })
            } catch (error) {
                return res.status(500).json({ error: error.message });
            }
        }   
    } catch (error) {
        res.status(400).json({ status: 400, message: "Failed to add user" })
    }   
}

// ****************************** List all users **********************************
const getUsers = async (req, res) => {
    try {
        // Get pagination items query or set default values
        const page = req.query.page *1 || 1
        const limit = req.query.limit *1 || 10
        const skip = (page - 1) * limit
        
        // Get all users with limit number per page and sort them by creation date.
        const users = await User.find().limit(limit).skip(skip).sort({ 'created_at': -1 });
        const count = users.length

        // Check the existence of users for each page
        if (count < 1) {
            res.status(404).json({ status: 404, message: "There is no users here" })
        } else res.status(200).json({status: 200, count, page, limit, data: users})
    } catch (error) {
        res.status(400).json({status: 400, message: "Failed to get users"})
    }
};

// ******************************* Get one user ***********************************
const getUser = async (req, res) => {
    try {
        // Get user Id from request params
        const userId = req.params.id; 
        
        // Find user by it's id
        const user = await User.findById(userId); 
        res.status(200).json({status: 200, data : user})
    } catch (error) {
        res.status(404).json({status: 404, message: "User not found"})
    }
};

// **************************** Search for user ***********************************
const searchUser = async (req, res) => {
    try {
        // Get pagination items query or set default values
        const page = req.query.page *1 || 1
        const limit = req.query.limit *1 || 10
        const skip = (page - 1) * limit
        
        // Get search query and add regex
        const searchQueryInput = req.query.search_query; 
        const searchQuery =  xss(searchQueryInput)
        const searchQueryRegex = new RegExp(searchQuery, 'i')

        // Get matching users by username with limit number per page and sort them by username.
        const matchingUser = await User.find({ username: searchQueryRegex })
            .limit(limit).skip(skip).sort({ 'username': -1 });
        const count = matchingUser.length

        // Check user existence by it's Id
        if (count < 1) {
            return res.status(404).json({status: 404, message: "User not found"})
        } else
            res.status(200).json({ status: 200, count, page, limit, data: matchingUser })
    } catch (error) {
        res.status(400).json({status: 400, message: "Failed to get user"})
    }
};

// ****************************** Update user **************************************
const updateUser = async (req, res) => {
    try {
        // Get user Id from request params
        const userId = req.params.id; 

        // Check user existence by it's Id
        const userExist = await User.findOne({ _id: userId });
        if (!userExist) {
            return res.status(404).json({
                status: 404,
                message: "User not found"
            })
        } else {
            // Get user data
            const { username, email, role } = req.body;

            // Get Password
            let password = req.body.password 

            // Check if the new username and email are already exists except for the updated one
            const dataExist = await User.findOne(
                {
                    $and: [
                        { $or: [{ email }, { username }] },
                        { _id: { $ne: userId } }
                    ]
                }
            );
            if (dataExist) {
                return res.status(400).json({
                    status: 400,
                    message: "Username or email already exists"
                })
            } else {
                if (password) {
                    // Password hashing
                    const salt = await bcrypt.genSalt();
                    const hashedPassword = bcrypt.hashSync(password, salt)
                    password = hashedPassword
                } else password = userExist.password 
                
                // Set current date to update_at
                const updatedAt = Date.now();
             
                // Find user by it's Id and update it
                await User.findByIdAndUpdate(userId,
                    { username, email, role, password, updated_at: updatedAt })
                res.status(200).json({ status: 200, message: "User updated successfully" })
            }
        }
    } catch (error) {
        res.status(400).json({ status: 400, message: "Failed to update user" })
    }   
}

// ******************************* Delete user *************************************
const deleteUser = async (req, res) => {
    try {
        // Get user Id from request params
        const userId = req.params.id;

        // Check existence of user
        const user = await User.findById(userId);

        if (!user) {
            res.status(404).json({ status: 404, message: "User not found" });
        } else {
            // Find user by it's Id and delete it
            await User.findByIdAndDelete(userId);
            res.status(200).json({ status: 200, message: "User deleted successfully" });
        }
    } catch (error) {
        res.status(400).json({ status: 400, message: "Failed to delete user" })
    }
};

module.exports = {addUser, getUsers, getUser, searchUser, updateUser, deleteUser};



