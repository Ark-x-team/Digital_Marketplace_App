const { Router } = require('express') 
const router = Router() // Create instance of router
const userController = require('../controllers/userController')

// Routes
router.post('/users', userController.addUser)
router.get('/users', userController.getUsers)
router.get('/users/search', userController.searchUser)
router.get('/users/:id', userController.getUser)
router.put('/users/:id', userController.updateUser)
router.delete('/users/:id', userController.deleteUser)

// Auth routes



module.exports = router