const ErrorHandler = require('../utils/errorhandler');


module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

    // mongodb cast error eg:- wrong id
    if (err.name === "CastError") {
        const message = `resource not found. Invalid: ${err.path}`;
        err = new ErrorHandler(message, 400);
    }

    // mongoose dublicate key error eg:- dublicate email
    if (err.code === 11000) {
        const message = `Dublicate ${Object.keys(err.keyValue)} Entered`;
        err = new ErrorHandler(message, 400);
    }

    // wrong JWT error 
    if (err.name === "JsonWebTokenError") {
        const message = `Json Web Token is invalid, Try again`;
        err = new ErrorHandler(message, 400);
    }

    //  JWT Expire error 
    if (err.name === "TokenExpiredError") {
        const message = `Json Web Token is Expired, Try again`;
        err = new ErrorHandler(message, 400);
    }

    return res.status(err.statusCode).send({ success: false, message: err.message });
}