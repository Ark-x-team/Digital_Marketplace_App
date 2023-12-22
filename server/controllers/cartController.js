// import models
const Cart = require("../models/Cart");
const Product = require("../models/Product");

//get cart items
const getCartItems = async (req, res) => {
    const owner = req.params.id;
  
    try {
      const cart = await Cart.findOne({ owner });

        res.status(200).json({ status: 200, cart });

    } catch (error) {
      res.status(500).send();
    }
  };

//add cart
const addToCart = async (req, res) => {
    const owner = req.params.id;
    const { itemId } = req.body;
    const quantity = 1;
  
    try {
      const cart = await Cart.findOne({ owner });
      const item = await Product.findOne({ _id: itemId });
  
      if (!item) {
        res.status(404).send({ message: "item not found" });
        return;
      }
      const price = item.price;
      const name = item.product_name;
      const files = item.product_files;
      const type = item.product_type;

      //If cart already exists for user,
      if (cart) {
        const itemIndex = cart.items.findIndex((item) => item.itemId == itemId);

        //check if product exists or not
        if (itemIndex > -1) {
          let product = cart.items[itemIndex];
          product.quantity += quantity;
  
          cart.bill = cart.items.reduce((acc, curr) => {
              return acc + curr.quantity * curr.price;
          },0)
          
          cart.items[itemIndex] = product;
          await cart.save();
          res.status(200).send(cart);
        } else {
          cart.items.push({ itemId, name, files, type, quantity, price });
          cart.bill = cart.items.reduce((acc, curr) => {
              return acc + curr.quantity * curr.price;
          },0)
  
          await cart.save();
          res.status(200).send(cart);
        }
      } else {
        //no cart exists, create one
        const newCart = await Cart.create({
          owner,
          items: [{ itemId, name, files, type, quantity, price }],
          bill: quantity * price,
        });
        return res.status(201).send(newCart);
      }
    } catch (error) {
      console.log(error);
      res.status(500).send("something went wrong");
    }
};

//delete item in cart
const removeFromCart = async (req, res) => {
    const owner = req.params.id;
   const {itemId} = req.body;
    try {
      let cart = await Cart.findOne({ owner });
  
      const itemIndex = cart.items.findIndex((item) => item.itemId == itemId);
      
      if (itemIndex > -1) {
        let item = cart.items[itemIndex];
        cart.bill -= item.quantity * item.price;
        if(cart.bill < 0) {
            cart.bill = 0
        } 
        cart.items.splice(itemIndex, 1);
        cart.bill = cart.items.reduce((acc, curr) => {
          return acc + curr.quantity * curr.price;
      },0)
        cart = await cart.save();
  
        res.status(200).send(cart);
      } else {
      res.status(404).send("item not found");
      }
    } catch (error) {
      console.log(error);
      res.status(400).send();
    }
};

module.exports = { getCartItems, addToCart, removeFromCart}