const express = require('express');
const router = express.Router();

const { getProducts, 
    newProduct, 
    getSingleProduct,
    updateProduct, 
    deleteProduct } = require('../controllers/productController')


const { isAuthenticated } = require('../middlewares/auth')

router.route('/products').get(getProducts);
router.route('/product/:id').get(getSingleProduct);

router.route('/admin/product/new').post(isAuthenticated, newProduct);

router.route('/admin/product/:id')
    .put(isAuthenticated, updateProduct)
    .delete(isAuthenticated, deleteProduct);


module.exports = router;