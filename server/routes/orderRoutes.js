const { Router } = require('express') 

// Create instance of router
const router = Router() 

// Order controller
const orderController = require('../controllers/orderController')

// Authorization middlewares
const { userRole, customerRole } = require('../middlewares/auth')

// Account middleware
const { validAccount } = require('../middlewares/account')

// Product Routes
router.post('/orders', customerRole, validAccount, orderController.createOrder)
// router.get('/orders', orderController.getOrders)
// router.get('/orders/:id', orderController.getOrder)
// router.put('/orders/:id', orderController.updateOrder)
// router.delete('/orders/:id', userRole, orderController.deleteOrder)

module.exports = router