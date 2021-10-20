const express = require('express');
const router = express.Router();

const { newOrder, getSingleOrder, myOrders, allOrders } = require('../controllers/orderController')

const { isAuthenticated } = require('../middlewares/auth');

router.route('/order/new'). post(isAuthenticated, newOrder)
router.route('/order/:id'). get(isAuthenticated, getSingleOrder)
router.route('/orders/me'). get(isAuthenticated, myOrders)
router.route('/orders'). get(isAuthenticated, allOrders)

module.exports = router;