const User = require('../models/user');

const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

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

    res.status(201).json({ 
        sucess: true,
        user
     })
})