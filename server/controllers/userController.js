const User = require("../models/User"); // Import user Model
const bcrypt = require('bcrypt') 
const jwt = require('jsonwebtoken');

// ******************************* Add user ************************************
const addUser = async (req, res) => {
    try {
        // Get user data
        const { username, email, password, role } = req.body; 

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
            const user = await User.create({ username, email, password: hashedPassword, role })
            res.status(200).json({ status: 200, message: "user added successfully" })
        }
    } catch (error) {
        res.status(400).json({ status: 400, message: "Failed to add user" })
        console.log(error);
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
        const searchQuery = req.query.search_query; 
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
            const { username, email, password, role } = req.body;
            
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
                // Password hashing
                const salt = await bcrypt.genSalt();
                const hashedPassword = bcrypt.hashSync(password, salt)
                
                // Set current date to update_at
                const updatedAt = Date.now();
             
                // Find user by it's Id and update it
                await User.findByIdAndUpdate(userId,
                    { username, email, password: hashedPassword, role, updated_at: updatedAt })
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
