const { Router } = require('express') 

// Create instance of router
const router = Router() 

// User controllers (CRUD & auth)
const userController = require('../controllers/userController')
const userAuthController = require('../controllers/auth/userAuthController')
const mailController = require('../controllers/mail/mailVerification')

// Middlewares (data validation & roles)
const { validationRules, passwordValidationRules, newDataValidationRules, dataValidation }  = require('../middlewares/validation')
const { adminRole, userRole } = require('../middlewares/auth')

// Auth routes
router.post('/users/login', userAuthController.userLogin)
router.post('/users/reset-password-verify', userAuthController.resetPasswordVerify)
router.post('/users/reset-password', passwordValidationRules(), dataValidation, mailController.userResetPassword)

// CRUD routes
router.post('/users', adminRole, validationRules(), dataValidation, userController.addUser)
router.get('/users', userRole, userController.getUsers)
router.get('/users/search', userRole, userController.searchUser)
router.get('/users/:id', userRole, userController.getUser)
router.put('/users/:id', adminRole, newDataValidationRules(), dataValidation, userController.updateUser)
router.delete('/users/:id', adminRole, userController.deleteUser)

module.exports = router