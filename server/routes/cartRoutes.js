const express = require("express");

// Create instance of router
const router = new express.Router();

// cart controllers (CRUD)
const cartController = require("../controllers/cartController");


// Middlewares (data validation & authorization)
const { customerRole, adminRole, userRole } = require('../middlewares/auth')

// Account middleware
const { validAccount } = require('../middlewares/account')

// CRUD routes
router.get("/cart/:id",customerRole, validAccount, cartController.getCartItems);
router.post("/cart/:id", customerRole, validAccount, cartController.addToCart);
router.delete("/cart/:id", customerRole, validAccount, cartController.removeFromCart);


module.exports = router;