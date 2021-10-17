const Product = require('../models/product')

const ErrorHandler = require('../utils/errorHandler')
const APIFeatures = require('../utils/apiFeatures')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')


// Create new product: /api/v1/product/new
exports.newProduct = catchAsyncErrors(async (req, res, next) => {
    
    // Create/add new product from req to the db
    const product = await Product.create (req.body)


    // adding functionality to handle image uploads later


    res.status(201).json ({
        success: true,
        product
    })
})

// Get all products: /api/v1/products?keyword=apple
exports.getProducts = catchAsyncErrors(async (req, res, next) => {
    // to pass keywords from the query
    const apiFeatures = new APIFeatures(Product.find(), req.query).search()
    
    const products = await apiFeatures.query;
    
    //const products = await Product.find();

    res.status(200).json ({
        success: true,
        count: products.length,
        products
    })
})

// Get single product: /api/v1/product/:id
exports.getSingleProduct = catchAsyncErrors(async (req, res, next) => {
    //find by id from req param
    const product = await Product.findById(req.params.id)
    
    // if not found
    if(!product) {
        // return res.status(404).json({
        //     success: false,
        //     message:'Product not found'
        // })

        return next(new ErrorHandler('Product not found', 404))
    }

    res.status(202).json({
        success: true,
        product
    })

})

// Update product: /api/v1/admin/product/:id
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
    //find by id from req param
    let product = await Product.findById(req.params.id)
    
    // if not found
    if(!product) {
        return res.status(404).json({
            success: false,
            message:'Product not found'
        })
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })

    res.status(200).json({
        success:true,
        product
    })

})

// Delete product (by id) : /api/v1/admin/product/:id
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
    //find by id from req param
    const product = await Product.findById(req.params.id)
    
    // if not found
    if(!product) {
        return res.status(404).json({
            success: false,
            message:'Product not found'
        })
    }

    await product.remove();

    res.status(200).json({
        success:true,
        message: 'Product has been deleted'
    })

})
