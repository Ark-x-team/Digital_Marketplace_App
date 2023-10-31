const { Router } = require('express') 
const router = Router() // Create instance of router
const customerController = require('../controllers/customerController')
const customerAuthController = require('../controllers/auth/customerAuthController')
const { validationRules, validationMiddleware }  = require('../middlewares/formValidation')
const authMiddleware = require('../middlewares/auth')

// Auth routes
router.post('/customers/signup', validationRules(), validationMiddleware, customerAuthController.customerSignup)
router.post('/customers/login', customerAuthController.customerLogin)
router.get('/customers/check-auth', authMiddleware, customerAuthController.checkAuth)
router.get('/customers/logout', customerAuthController.customerLogout)

// Routes
router.get('/customers', customerController.getCustomers)
router.get('/customers/search', customerController.searchCustomer)
router.get('/customers/:id', customerController.getCustomer)
router.put('/customers/:id', customerController.updateCustomer)
router.delete('/customers/:id', customerController.deleteCustomer)

module.exports = router