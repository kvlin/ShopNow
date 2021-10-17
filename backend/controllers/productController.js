const Product = require('../models/product')

// Create new product: /api/v1/product/new
exports.newProduct = async (req, res, next) => {
    // Create/add new product from req to the db
    const product = await Product.create (req.body)


    // adding functionality to handle image uploads later


    res.status(201).json ({
        success: true,
        product
    })
}

// Get all products: /api/v1/products
exports.getProducts = async (req, res, next) => {

    const products = await Product.find();

    res.status(200).json ({
        success: true,
        count: products.length,
        products
    })
}

// Get single product: /api/v1/product/:id
exports.getSingleProduct = async (req, res, next) => {
    //find by id from req param
    const product = await Product.findById(req.params.id)
    
    // if not found
    if(!product) {
        return res.status(404).json({
            success: false,
            message:'Product not found'
        })
    }

    res.status(202).json({
        success: true,
        product
    })

}

// Update product: /api/v1/admin/product/:id
exports.updateProduct = async (req, res, next) => {
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

}

