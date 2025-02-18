export class BaseError extends Error {
    constructor(name, statusCode, message, details = {}, isOperational = true) {
        super(message);
        this.name = name;
        this.statusCode = statusCode;
        this.details = details;
        this.isOperational = isOperational;
        Error.captureStackTrace(this, this.constructor);
    }
}

