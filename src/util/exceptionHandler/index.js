import { NotFoundException, UnauthorizedException } from './exception.js';

export const exceptionHandler = (exception, req, res, next) => {
    // Exception can be defined in ./exception.js or throw from library
    // we catch all user defined except, and the rest should be status 500

    if (exception instanceof NotFoundException) {
        return res.status(404).json({ message: exception.message });
    }

    if (exception instanceof UnauthorizedException) {
        return res.status(401).json({ message: exception.message });
    }

    return res.status(500).json({ message: 'Internal Server Error' });
};
