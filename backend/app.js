const express = require('express');
const app = express();

const errorMiddleware = require('./middlewares/errors')

app.use(express.json())

// Import all routes
const products = require('./routes/products');
const auth = require('./routes/auth');

app.use('/api/v1', products)
app.use('/api/v1', auth)
// Error handler middleware
app.use(errorMiddleware);


module.exports = app