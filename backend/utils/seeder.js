const Product = require('../models/product');
const dotenv = require('dotenv');
const connectDatabase = require('../config/database')

const products = require('../seed/products');

// Setting dotenv file
dotenv.config({ path: 'backend/config/config.env' })

connectDatabase ()

const seedProducts = async () => {
    try {
        // delete whole collection data
        await Product.deleteMany();
        console.log('Products are deleted');

        // Insert all products
        await Product.insertMany(products);
        console.log('All products are added');
        process.exit

    } catch(err) {
        console.log('Error' + err);
        process.exit
    }
}

seedProducts()