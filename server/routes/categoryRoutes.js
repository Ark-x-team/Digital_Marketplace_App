const { Router } = require('express') 

// Create instance of router
const router = Router() 

// Category controller
const categoryController = require('../controllers/categoryController')

// Authorization middleware
const {userRole} = require('../middlewares/auth')

// Routes
router.post('/categories', userRole, categoryController.createCategory)
router.get('/categories', categoryController.getCategories)
router.get('/categories/search', categoryController.searchCategories)
router.get('/categories/:id', categoryController.getCategory)
router.put('/categories/:id', userRole, categoryController.updateCategory)
router.delete('/categories/:id', userRole, categoryController.deleteCategory)

module.exports = router