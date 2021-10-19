const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

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

// Password encryption
// before SAVING (save), do something
userSchema.pre('save', async function (next) {
    // if password is not updated and changed (for existing user), 
    // proceed the next middleware that is in pipeline.
    // skips encrypting
    if(!this.isModified('password')) {
        next()
    }

    this.password = await bcrypt.hash(this.password, 10 )
} )

// Return JSON web token (sighed by particular id)
userSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this._id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_TIME
    } ) // id as payload
}

// Compare user password
userSchema.methods.comparePassword = async function (enteredPassword) {
    // using compare method in bycrpt
    return await bcrypt.compare(enteredPassword, this.password)
}

module.exports = mongoose.model ("User", userSchema)