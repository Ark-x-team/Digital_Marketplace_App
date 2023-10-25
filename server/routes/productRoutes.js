const { Router } = require('express')
const router = Router()
const productController = require('../controllers/productController')
const uploadMiddleware = require('../middlewares/uploadMiddleware')

router.post('/v1/products', uploadMiddleware, productController.createProduct)
router.get('/v1/products', productController.getProducts)
router.get('/v1/products/:id', productController.getProduct)
router.delete('/v1/products/:id', productController.deleteProduct)

module.exports = router