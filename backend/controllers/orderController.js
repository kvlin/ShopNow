const Order = require('../models/order')
const Product = require('../models/product');

const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const order = require('../models/order');

// Create a new order: /api/v1/order/new
exports.newOrder = catchAsyncErrors( async (req, res, next) => {
    const {
        orderItems,
        shippingPrice,
        itemsPrice,
        taxPrice,
        shippingInfo,
        totalPrice,
        paymentInfo
    } = req.body;

    const order = await Order.create ({
        orderItems,
        shippingPrice,
        itemsPrice,
        taxPrice,
        totalPrice,
        shippingInfo,
        paymentInfo,
        paidAt:Date.now(),
        user: req.user._id
    })

    res.status(200).json({
        success: true,
        order
    })
})

// Get single order: /api/v1/order/:id
exports.getSingleOrder = catchAsyncErrors( async (req, res, next) => {
    
    const order = await Order.findById(req.params.id).populate('user', 'name email')

    if(!order) {
        return next (new ErrorHandler('No order found with this ID', 404))
    }

    res.status(200).json ({
        success: true,
        order
    })

})

// Get logged-in user's orders: /api/v1/orders/me
exports.myOrders = catchAsyncErrors( async (req, res, next) => {
    
    const order = await Order.find({user: req.user.id})

    res.status(200).json ({
        success: true,
        order
    })

})

// Get all orders: api/v1/orders
exports.allOrders = catchAsyncErrors( async (req, res, next) => {
    const orders = await Order.find()

    // calculate total amount
    let totalAmount = 0;
    orders.forEach(order => {
        totalAmount += order.totalPrice
    })

    res.status(200).json ({
        success: true,
        totalAmount,
        orders
    })
})

// Update / Process order : /api/v1/order/admin/order/:id, only admins can modify orders placed
exports.updateOrder = catchAsyncErrors( async (req, res, next) => {
    const order = await Order.findById(req.params.id)

    // check if delivered
    if(order.orderStatus === 'Delivered') {
        return next(new ErrorHandler('This order has already been delivered'))
    }

    // update product stock
    order.orderItems.forEach(async item => {
        await updateStock(item.product, item.quantity)
    })

    // update order status
    order.orderStatus = req.body.status
    order.deliveredAt = Date.now()

    await order.save({ validateBeforeSave: false })

    res.status(200).json ({
        success: true,
        order
    })
})

async function updateStock(id, quantity) {
    const product = await Product.findById(id);
    console.log(product)
    product.stock  = product.stock - quantity

    await product.save({ validateBeforeSave: false })
}

// delete single order: /api/v1/order/:id
exports.deleteOrder = catchAsyncErrors( async (req, res, next) => {
    
    const order = await Order.findById(req.params.id)

    if(!order) {
        return next (new ErrorHandler('No order found with this ID', 404))
    }

    await order.remove()

    res.status(200).json ({
        success: true
    })

})

// delete single order: /api/v1/order/:id
exports.deleteOrder = catchAsyncErrors( async (req, res, next) => {
    
    const order = await Order.findById(req.params.id)

    if(!order) {
        return next (new ErrorHandler('No order found with this ID', 404))
    }

    await order.remove()

    res.status(200).json ({
        success: true
    })

})

