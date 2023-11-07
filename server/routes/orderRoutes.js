const { Router } = require('express') 

// Create instance of router
const router = Router() 

// Order controller
const orderController = require('../controllers/orderController')

// Authorization middlewares
const { userRole, customerRole } = require('../middlewares/auth')

// Account middleware
const { validAccount } = require('../middlewares/account')

// ******************************** Order Routes *******************************

// Back office
router.get('/orders', userRole, orderController.getOrders)

// Client
router.post('/orders', customerRole, validAccount, orderController.createOrder)
router.get('/customer-orders', customerRole, validAccount, orderController.getCustomerOrders)

// router.get('/orders/:id', orderController.getOrder)
// router.put('/orders/:id', orderController.updateOrder)
// router.delete('/orders/:id', userRole, orderController.deleteOrder)

module.exports = router