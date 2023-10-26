const { Router } = require('express')
const router = Router()
const productController = require('../controllers/productController')
const uploadMiddleware = require('../middlewares/uploadMiddleware')

router.post('/products', uploadMiddleware, productController.createProduct)
router.get('/products', productController.getProducts)
router.get('/products/search', productController.searchProduct)
router.get('/products/:id', productController.getProduct)
router.delete('/products/:id', productController.deleteProduct)

module.exports = router