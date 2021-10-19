const ErrorHandler = require('../utils/errorHandler')
const jwt = require('jsonwebtoken')
const catchAsyncErrors = require('./catchAsyncErrors')
const User = require('../models/user')
// Checks if user is authenticated or not
exports.isAuthenticated = catchAsyncErrors( async (req, res, next) => {


    // authentication on the server side -> more secure
    const { token } = req.cookies

    //console.log(token) // logs on console

    // if no token found -> means not logged in
    if (!token) {
        return next (new ErrorHandler('Login first to access this resource.', 401))
    }

    const decoded = jwt.verify(token,process.env.JWT_SECRET)
    //console.log(decoded) //{ id: '616ea61f906f066c30d1c00c', iat: 1634643642, exp: 1635248442 }
    
    req.user = await User.findById(decoded.id)
    next() // continue to the next task
})