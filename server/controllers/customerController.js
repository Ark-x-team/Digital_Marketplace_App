const Customer = require("../models/Customer"); // Import customer Model
const bcrypt = require('bcrypt') 
const xss = require('xss');

// ****************************** Add user *********************************
const addUser = async (req, res) => {
    // Get user data
    const { username, email, password, role } = req.body;

    // Sanitize the user input
    const sanitizedData = {
        username: xss(username),
        email: xss(email),
        password: xss(password),
      };
    try {
        const userExist = await User.findOne({ $or: [{ email }, { username }] });
        if (userExist) {
            return res.status(400).json({
                status: 400,
                message: "User already exists, check your email or username"
            })
        } else {
                const salt = await bcrypt.genSalt();
                const hashedPassword = bcrypt.hashSync(sanitizedData.password, salt)
                // Post user data
            const user = await User.create(
                {
                    username: sanitizedData.username,
                    email: sanitizedData.email,
                    password: hashedPassword,
                    role
                })
                res.status(200).json({ status: 200, message: "User Added successfully" })
        }
    }catch(error){
        console.log(error);
        res.status(400).json({status: 400, message: "Failed to add user"})
    }
}

// ****************************** List all customers **********************************
const getCustomers = async (req, res) => {
    try {
        // Get pagination items query or set default values
        const page = req.query.page *1 || 1
        const limit = req.query.limit *1 || 10
        const skip = (page - 1) * limit
        
        // Get all customers with limit number per page and sort them by creation date.
        const customers = await Customer.find().limit(limit).skip(skip).sort({ 'created_at': -1 });
        const count = customers.length

        // Check the existence of customers for each page
        if (count < 1) {
            res.status(404).json({ status: 404, message: "There is no customers here", data: [] })
        } else res.status(200).json({status: 200, count, page, limit, data: customers})
    } catch (error) {
        res.status(400).json({status: 400, message: "Failed to get customers"})
    }
};

// ******************************* Get one customer ***********************************
const getCustomer = async (req, res) => {
    try {
        // Get customer Id from request params
        const customerId = req.params.id; 
        
        // Find customer by it's id
        const customer = await Customer.findById(customerId); 
        res.status(200).json({status: 200, data : customer})
    } catch (error) {
        res.status(404).json({status: 404, message: "Customer not found"})
    }
};

// **************************** Search for customer ***********************************
const searchCustomer = async (req, res) => {
    try {
        // Get items query of pagination or set default values
        const page = req.query.page *1 || 1
        const limit = req.query.limit *1 || 10
        const skip = (page - 1) * limit
        
        // Get search query and add regex
        const searchQuery = req.query.search_query; 
        const searchQueryRegex = new RegExp(searchQuery, 'i')

        // Get matching customers by username with limit number per page and sort them by username.
        const matchingCustomer = await Customer.find({ username: searchQueryRegex })
            .limit(limit).skip(skip).sort({ 'username': -1 });
        const count = matchingCustomer.length

        // Check customer existence by it's Id
        if (count < 1) {
            return res.status(404).json({status: 404, message: "Customer not found"})
        } else
            res.status(200).json({ status: 200, count, page, limit, data: matchingCustomer })
    } catch (error) {
        res.status(400).json({status: 400, message: "Failed to get customer"})
    }
};

// ****************************** Update customer **************************************
const updateCustomer = async (req, res) => {
    try {
        // Get customer Id from request params
        const customerId = req.params.id; 

        // Check customer existence by it's Id
        const customerExist = await Customer.findOne({ _id: customerId });
        if (!customerExist) {
            return res.status(404).json({
                status: 404,
                message: "Customer not found"
            })
        } else {
            // Get customer data
            const { username, email, role, valid_account } = req.body;

            // Get Password
            let password = req.body.password 

            // Check if the new username and email are already exists except for the updated one
            const dataExist = await Customer.findOne(
                {
                    $and: [
                        { $or: [{ email }, { username }] },
                        { _id: { $ne: customerId } }
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
                } else password = customerExist.password 
                
                // Set current date to update_at
                const updatedAt = Date.now();
             
                // Find customer by it's Id and update it
                await Customer.findByIdAndUpdate(customerId,
                    { username, email, password, role, updated_at: updatedAt, valid_account })
                res.status(200).json({ status: 200, message: "Customer updated successfully" })
            }
        }
    } catch (error) {
        res.status(400).json({ status: 400, message: "Failed to update customer" })
    }   
}

// ******************************* Delete customer *************************************
const deleteCustomer = async (req, res) => {
    try {
        // Get customer Id from request params
        const customerId = req.params.id;

        // Check existence of customer
        const customer = await Customer.findById(customerId);

        if (!customer) {
            res.status(404).json({ status: 404, message: "Customer not found" });
        } else {
            // Find customer by it's Id and delete it
            await Customer.findByIdAndDelete(customerId);
            res.status(200).json({ status: 200, message: "Customer deleted successfully" });
        }
    } catch (error) {
        res.status(400).json({ status: 400, message: "Failed to delete customer" })
    }
};

module.exports = {
    addUser, getCustomers, getCustomer, searchCustomer, updateCustomer, deleteCustomer
};
