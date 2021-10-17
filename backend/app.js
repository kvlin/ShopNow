const express = require('express');
const app = express();

const errorMiddleware = require('./middlewares/errors')

app.use(express.json())

// Import all routes
const products = require('./routes/products');

app.use('/api/v1', products)

// Error handler middleware
app.use(errorMiddleware);


module.exports = app