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

exports.getProducts = (req, res, next) => {
    res.status(200).json ({
        success: true,
        message: 'This route will show all products in database.'
    })
}