const mongoose = require('mongoose');

const productsSchema = new mongoose.Schema ({
    name: {
        type: String,
        required: [true, 'Please enter products name'],
        trim: true,
        maxLength: [100, 'Product name cannot exeed 100 characters']
    },
    price: {
        type: String,
        required: [true, 'Please enter products name'],
        trim: true,
        maxLength: [7, 'Product name cannot exeed 5 characters']
    },
    description: {
        type: String,
        required: [true, 'Please enter products description']
    },
    ratings: {
        type: Number,
        default: 0
    },
    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }
    ],
    category: {
        type: String,
        required: [true, 'Please select products category'],
        enum: {
            values: [
                'Electronics',
                'Cameras',
                'Kitchenware ',
                'Accessories',
                'Books',
                'Clothes',
                'Sports',
                'Beauty/Health',
                'Home',
                'Outdoor',
                'Food',
                'Other'
            ],
            message: 'Please select a category for the product'
        }
    },
    seller: {
        type: String,
        required: [true, 'Please enter product seller']
    },
    stock: {
        type: Number,
        required: [true, 'please enter product stock'],
        maxLength: [5, 'Product stock cannot exceed 5 characters'],
        default: 0
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    // Array of reviews
    reviews: [
        {

            // User id to be added later

            name: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            }
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }
})

// Collection name = products (become plural)
module.exports = mongoose.model ("Product", productsSchema)