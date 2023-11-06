const { Router } = require('express') 

// Create instance of router
const router = Router() 

// User controllers (CRUD & auth)
const customerController = require('../controllers/customerController')
const customerAuthController = require('../controllers/auth/customerAuthController')
const mailController = require('../controllers/mail/mailVerification')

// Middlewares (data validation & authorization)
const { validationRules, passwordValidationRules, newDataValidationRules, dataValidation }  = require('../middlewares/validation')
const { customerRole, adminRole, userRole } = require('../middlewares/auth')

// Auth routes
router.post('/customers/signup', validationRules(), dataValidation, customerAuthController.customerSignup)
router.get('/customers/email-verify', mailController.accountVerification) 
router.post('/customers/login', customerAuthController.customerLogin)
router.post('/customers/reset-password-verify', customerAuthController.resetPasswordVerify)
router.post('/customers/reset-password', passwordValidationRules(), dataValidation, mailController.customerResetPassword)

// CRUD routes
router.get('/customers', userRole, customerController.getCustomers)
router.get('/customers/search', userRole, customerController.searchCustomer)
router.get('/customers/:id', customerController.getCustomer)
router.put('/customers/:id', newDataValidationRules(), dataValidation, customerController.updateCustomer)
router.delete('/customers/:id', customerRole, customerController.deleteCustomer)

module.exports = router