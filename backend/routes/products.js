const express = require('express');
const router = express.Router();

const { getProducts, 
    newProduct, 
    getSingleProduct,
    updateProduct, 
    deleteProduct } = require('../controllers/productController')


const { isAuthenticated, authorizedRoles } = require('../middlewares/auth')

router.route('/products').get(isAuthenticated, getProducts);
router.route('/product/:id').get(getSingleProduct);

router.route('/admin/product/new').post(isAuthenticated, authorizedRoles('admin'), newProduct);

router.route('/admin/product/:id')
    .put(isAuthenticated, authorizedRoles('admin'), updateProduct)
    .delete(isAuthenticated, authorizedRoles('admin'), deleteProduct);


module.exports = router;