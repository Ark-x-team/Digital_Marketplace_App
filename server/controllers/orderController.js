const Order = require("../models/Order"); 

// ******************************* Create Order ************************************
const createOrder = async (req, res) => {
    try {
        // Get order data
        const { customer_id, order_items, cart_total_price } = req.body;
        
        // Post order data
        const order = await Order.create({ customer_id, order_items, cart_total_price })
        res.status(200).json({ status: 200, message: "order created successfully" })
    } catch (error) {
        res.status(400).json({status: 400, message: "Failed to create order"})
    }   
}

// ****************************** List all orders **********************************
const getOrders = async (req, res) => {
    try {
        // Get pagination items query or set default values
        const page = req.query.page *1 || 1
        const limit = req.query.limit *1 || 10
        const skip = (page - 1) * limit
        
        // Get all products with limit number per page and sort them by creation date.
        const products = await Product.aggregate([
            {
              $lookup: {
                from: "subcategories",
                localField: "subcategory_id",
                foreignField: "_id",
                as: "subcategory",
              },
            },
            {
              $unwind: "$subcategory",
            },
            {
              $project: {
                _id: 1,
                product_name: 1,
                subcategory_id:"$subcategory._id",
                subcategory_name: "$subcategory.subcategory_name",
                product_images: 1,
                short_description: 1,
                long_description: 1,
                price: 1,
                discount_price: 1,
                active: 1,
              },
            },
          ])
            .limit(limit).skip(skip).sort({ 'created_at': -1 });
        const count = products.length

        // Check the existence of products for each page
        if (count < 1) {
            res.status(404).json({ status: 404, data: [] })
        } else res.status(200).json({status: 200, count, page, limit, data: products})
    } catch (error) {
        res.status(400).json({status: 400, message: "Failed to get products"})
    }
};

// ******************************* Get one order ***********************************
const getOrder = async (req, res) => {
    try {
        // Get product id from request params
        const productId = req.params.id; 

        // Get product by its ID
        const product = await Product.findById(productId);

        if (!product) {
            res.status(404).json({ status: 404, message: "Product not found" });
        } else {

            // Get subcategory name using aggregation
            const productWithSubcategory = await Product.aggregate([
                {
                    $match: { _id: product._id },
                },
                {
                    $lookup: {
                        from: "subcategories", 
                        localField: "subcategory_id",
                        foreignField: "_id",
                        as: "subcategory",
                    },
                },
                {
                    $unwind: "$subcategory",
                },
                {
                    $project: {
                        _id: 1,
                        product_name: 1,
                        subcategory_id:"$subcategory._id",
                        subcategory_name: "$subcategory.subcategory_name",
                        product_images: 1,
                        short_description: 1,
                        long_description: 1,
                        price: 1,
                        discount_price: 1,
                        active: 1,
                    },
                },
            ]);
            if (!productWithSubcategory || productWithSubcategory.length === 0) {
                res.status(500).json({ status: 500, error: "Failed to retrieve subcategory name" });
            } else {
                res.status(200).json({ status: 200, data: productWithSubcategory });
            }
        }
        
        res.status(200).json({status: 200, data : product})
    } catch (error) {
        res.status(404).json({status: 404, message: "Product not found"})
    }
};

// ******************************* Update order ************************************
const updateOrder = async (req, res) => {
    try {
        // Get product Id from request params
        const productId = req.params.id; 

        // Check product existence by it's Id
        const orderExist = await Product.findOne({ _id: productId });
        if (!orderExist) {
            return res.status(404).json({
                status: 404,
                message: "Product not found"
            })
        } else {
            // Get product data
            const { sku, product_name, short_description, long_description,
                options, active, subcategory_id } = req.body;
            
            // Get images files
            const files = req.files;

            // Check if the new name and serialization are already exists except for the updated one
            const dataExist = await Product.findOne(
                {
                    $and: [
                        { $or: [{ product_name }, { sku }] },
                        { _id: { $ne: productId } }
                    ]
                }
            );
            if (dataExist) {
                return res.status(400).json({
                    status: 400,
                    message: "Product name or serialization already exists"
                })
            } else {
                // Store images in uploads folder
                files.forEach((file) => {
                    const filePath = `public/uploads/${file.filename}`;
                    fs.rename(file.path, filePath, (error) => {
                        if (error) return res.status(500).json({
                             status: 500,
                             message: 'Failed to store the images files'
                        })
                    })
                });
 
                // Check files existence and attach filenames to product_images
                const product_images = files.length > 0 ? files.map(file => file.filename) : orderExist.product_images
 
                // Get the product price
                const price = req.body.price || orderExist.price
 
                // Get the product discount_price
                const discount_price = req.body.discount_price || orderExist.discount_price
             
                // Set current date to update_at
                const updatedAt = Date.now();
             
                // Find product by it's Id and update it
                await Product.findByIdAndUpdate(productId, {
                     sku, product_name, product_images, price, discount_price, short_description,
                     long_description, options, active, updated_at: updatedAt, subcategory_id
                })
                res.status(200).json({ status: 200, message: "Product updated successfully" })
            }
        }
    } catch (error) {
        res.status(400).json({ status: 400, message: "Failed to update product" })
    }   
}

// ***************************** Delete from order **********************************
const deleteFromOrder = async (req, res) => {
    try {
        // Get product Id from request params
        const productId = req.params.id;

        // Check existence of product
        const product = await Product.findById(productId);

        if (!product) {
            res.status(404).json({ status: 404, message: "Product not found" });
        } else {
            // Find product by it's Id and delete it
            await Product.findByIdAndDelete(productId);
            res.status(200).json({ status: 200, message: "Product deleted successfully" });
        }
    } catch (error) {
        res.status(400).json({ status: 400, message: "Failed to delete product" })
    }
};


module.exports = {createOrder};
