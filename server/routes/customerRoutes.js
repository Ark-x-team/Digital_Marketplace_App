const { Router } = require('express') 

// Create instance of router
const router = Router() 

// User controllers (CRUD & auth)
const customerController = require('../controllers/customerController')
const customerAuthController = require('../controllers/auth/customerAuthController')

// Middlewares (data validation & authorization)
const { validationRules, passwordValidationRules, newDataValidationRules, dataValidation }  = require('../middlewares/validation')
const { customerRole, adminRole, userRole } = require('../middlewares/auth')

// Auth routes
router.post('/customers/signup', validationRules(), dataValidation, customerAuthController.customerSignup)
router.post('/customers/email-verification', customerAuthController.accountVerification) 
router.post('/customers/login', customerAuthController.customerLogin)
router.post('/customers/google-login', customerAuthController.customerGoogleLogin)
router.get('/customers/logout', customerAuthController.customerLogout)
router.post('/customers/reset-password-verification', customerAuthController.resetPasswordVerification)
router.post('/customers/reset-password', passwordValidationRules(), dataValidation, customerAuthController.customerResetPassword)

// Generate refresh token
// router.get('/customers/refresh-token', customerAuthController.handleRefreshToken)

// CRUD routes
router.get('/customers', userRole, customerController.getCustomers)
router.get('/customers/search', userRole, customerController.searchCustomer)
router.get('/customers/:id', customerController.getCustomer)
router.put('/customers/:id', newDataValidationRules(), dataValidation, customerController.updateCustomer)
router.delete('/customers/:id', customerRole, customerController.deleteCustomer)

module.exports = router