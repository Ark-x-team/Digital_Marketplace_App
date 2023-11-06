const { Router } = require('express') 

// Create instance of router
const router = Router() 

// Category controller
const subcategoryController = require('../controllers/subcategoryController')

// Authorization middleware
const {userRole} = require('../middlewares/auth')

// Routes
router.post('/subcategories', userRole, subcategoryController.createSubcategory)
router.get('/subcategories', subcategoryController.getSubcategories)
router.get('/subcategories/search', subcategoryController.searchSubcategories)
router.get('/subcategories/:id', subcategoryController.getSubcategory)
router.put('/subcategories/:id', userRole, subcategoryController.updateSubcategory)
router.delete('/subcategories/:id', userRole, subcategoryController.deleteSubcategory)


module.exports = router