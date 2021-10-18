const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required:[true, 'Please enter your name'],
        maxLength:[30, 'Your name cannot exceed 30 characters']
    },
    email: {
        type: String,
        require: [true, 'Please enter your email address'],
        unique: true,
        validate: [validator.isEmail, 'Please enter a valid email address'] // will check if is email or not
    },
    password: {
        type:String,
        required: [true, 'Please enter your password'],
        minLength:[6, 'Your password must be longer than 6 characters'],
        select: false // making this field (password) inaccessible by default
    },
    avatar: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    role: {
        type: String,
        default: 'user'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    resetPasswordToken: String, // token for reset password
    resetPasswordExpire: Date,
})

module.exports = mongoose.model ("User", userSchema)