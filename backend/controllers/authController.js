const User = require('../models/user');

const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const sendToken = require('../utils/jwtToken');

// Register a user: /api/v1/register
exports.registerUser = catchAsyncErrors( async (req, res, next) => {

    const { name, email, password } = req.body; 

    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: 'Lorem Picsum',
            url: 'https://picsum.photos/200',
        }
    })

    // const token = user.getJwtToken()

    // res.status(201).json({ 
    //     sucess: true,
    //     token
    //  })

    sendToken(user, 200, res)
})

// Login user: /api/v1/login
exports.loginUser = catchAsyncErrors( async (req, res, next) => {
    const { email, password } = req.body; 

    // checks if email and password are provided
    if(!email || !password) {
        return next(new ErrorHandler('Please enter email & password', 400))
    }

    // Finding user in Database
    // use 'select' method there as password has been specified as select = false in schema
    const user = await User.findOne({email}).select('+password')

    if(!user) {
        return next(new ErrorHandler("Invalid Email or Password", 401))
    }

    // Check if the password is correct
    const isPasswordMatched = await user.comparePassword(password)

    if(!isPasswordMatched) {
        return next(new ErrorHandler('Invalid Email or Password', 401))
    }

    // // if successfully logged in, generate token
    // const token = user.getJwtToken()
    // res.status(201).json({ 
    //     sucess: true,
    //     token
    //  })

    sendToken(user, 200, res)
})

// Logout user: /api/v1/logout
exports.logoutUser = catchAsyncErrors( async (req, res, next) => {
    res.cookie('token', null, {
        expires: new Date (Date.now()),
        httpOnly:true
    }) 

    res.status(200).json ({
        sucess: true,
        message: 'Logged out'
    })
})