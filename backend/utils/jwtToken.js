// Create and send token and save in the cookie
const sendToken = (user, statusCode,res) => {

    // Create Jwt token
    const token = user.getJwtToken();
    

    // Options for cookie
    const options = {
        expires: new Date(
            // in ms
            Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000,
        ),
        httpOnly: true // if not httpOnly, JS code can access this
    }

    // token key, token value
    res.status(statusCode).cookie('token', token, options).json({
        success: true,
        token,
        user
    })
}

module.exports = sendToken;