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

// Get currently logged in user details: /api/v1/me
exports.getUserProfile = catchAsyncErrors( async (req, res, next) => {
    const user = await User.findById(req.user.id)

    res.status(200).json({
        success: true,
        user
    })

})

// Update user profile: /api/v1/me/update
exports.updateProfile = catchAsyncErrors( async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
    }

    // Update avatar: TODO

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindandModify: false
    })

    res.status(200).json({
        success: true,
        user
    })
})

// Get all users: api/v1/admin/users
exports.allUsers = catchAsyncErrors( async (req, res, next) => {
    const users = await User.find();
    res.status(200).json({
        success: true,
        users
    })
})

// Get a specific user: api/v1/admin/user/:id
exports.getUserDetails = catchAsyncErrors( async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if(!user) {
        return next(new ErrorHandler (`User ID ${req.params.id} not found`))
    }
    res.status(200).json({
        success: true,
        user
    })
})