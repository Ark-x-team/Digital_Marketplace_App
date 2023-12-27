const { Router } = require('express') 

// Create instance of router
const router = Router() 

const paymentController = require('../controllers/paymentController')

// Middlewares (authorization)
const { customerRole } = require('../middlewares/auth')

// Auth routes
router.post('/create-checkout-session', paymentController.checkout)

module.exports = router