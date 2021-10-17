// Create a class inherited class from Error class 
class ErrorHandler extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode

        //Create .stack property on the target object
        Error.captureStackTrace(this, this.constructor)
    }
}

module.exports = ErrorHandler;