const ErrorHandler = require ('../utils/errorHandler');
//express knows this middleware is for error handling because it has
 //* four parameters (err, req, res, next)
module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500; // 500 by default meaning internal error
    err.message = err.message || 'Internal server error';

    // Error handling if in DEVELOPMENT mode
    if(process.env.NODE_ENV == 'DEVELOPMENT'){
        res.status(err.statusCode).json({
            success:false,
            error: err,
            errMessage: err.message, // more detailed message
            stack: err.stack
        })
    }

    // Error handling if in PRODUCTION mode
    if(process.env.NODE_ENV == 'PRODUCTION'){
        let error = {...err}

        error.message = err.message 

        res.status(error.statusCode).json({
            success: false,
            message: err.message || 'Internal Server Error'
        })
    }

}