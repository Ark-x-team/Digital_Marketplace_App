const Order = require("../models/Order"); 
const OrderItem = require("../models/OrderItem"); 

// ******************************* Create Order ************************************
const createOrder = async (req, res) => {
    try {
        // Get order data
        const { customer_id, cart_total_price, order_items } = req.body;
        
        // Get id of order item and store order items in OrderItem collection
        const orderItemsIds = Promise.all(req.body.order_items.map( async orderItem => {
            let newOrderItem = await OrderItem.create({
                product: orderItem.product,
                quantity: orderItem.quantity,
            })
            return await newOrderItem._id
        }))
        const orderItemsIdsResolved = await orderItemsIds

        // Post order data
        const order = await Order.create({ customer_id, order_items: orderItemsIdsResolved, cart_total_price })
        res.status(200).json({ status: 200, message: "order created successfully" })
    } catch (error) {
        res.status(400).json({ status: 400, message: "Failed to create order" })
        console.log(error);
    }   
}

// ****************************** List all orders **********************************
const getOrders = async (req, res) => {
    try {
        // Get pagination items query or set default values
        const page = req.query.page *1 || 1
        const limit = req.query.limit *1 || 10
        const skip = (page - 1) * limit
        
        // Get all orders data with limit number per page and sort them by creation date.
        const orders = await Order.find().populate('customer_id').populate('order_items')
            .limit(limit).skip(skip).sort({ 'created_at': -1 });
        const count = orders.length

        // Check the existence of orders for each page
        if (count < 1) {
            res.status(404).json({ status: 404, data: [] })
        } else res.status(200).json({status: 200, count, page, limit, data: orders})
    } catch (error) {
        res.status(400).json({ status: 400, message: "Failed to get orders" })
    }
};

const getCustomerOrders = async (req, res) => {
    try {
        // Get pagination items query or set default values
        const page = req.query.page *1 || 1
        const limit = req.query.limit *1 || 10
        const skip = (page - 1) * limit
        
        // Get all orders data with limit number per page and sort them by creation date.
        const orders = await Order.find().populate('customer_id').populate('order_items')
            .limit(limit).skip(skip).sort({ 'created_at': -1 });
        const count = orders.length

        // Check the existence of orders for each page
        if (count < 1) {
            res.status(404).json({ status: 404, data: [] })
        } else res.status(200).json({status: 200, count, page, limit, data: orders})
    } catch (error) {
        res.status(400).json({ status: 400, message: "Failed to get orders" })
        console.log(error);
    }
};




module.exports = {createOrder, getOrders, getCustomerOrders};
