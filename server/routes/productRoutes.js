const { Router } = require('express') 

// Create instance of router
const router = Router() 

// Product controller
const productController = require('../controllers/productController')

// Files upload middleware
const uploadMiddleware = require('../middlewares/filesUpload')

// Authorization middleware
const { userRole } = require('../middlewares/auth')

// Product Routes
router.post('/products',  uploadMiddleware, productController.createProduct)
router.get('/products-category', productController.getProductsByCategory)
router.get('/products-subcategory', productController.getProductsBySubcategory)
router.get('/products-by-filter', productController.getProductsByFilter)
router.get('/products/search', productController.searchProduct)
router.get('/products/:id', productController.getProduct)
router.put('/products/:id', userRole, uploadMiddleware, productController.updateProduct)
router.delete('/products/:id', userRole, productController.deleteProduct)

module.exports = router