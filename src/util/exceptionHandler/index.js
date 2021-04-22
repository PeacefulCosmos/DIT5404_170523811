import { NotFoundException, UnauthorizedException, BadRequestException } from './exception.js';

export const exceptionHandler = (exception, req, res, next) => {
    // Exception can be defined in ./exception.js or throw from library
    // we catch all user defined except, and the rest should be status 500
    console.error(exception);

    if (exception instanceof BadRequestException) {
        return res.status(400).json({ message: exception.message || 'Bad Request' });
    }

    if (exception instanceof NotFoundException) {
        return res.status(404).json({ message: exception.message || 'Not Found' });
    }

    if (exception instanceof UnauthorizedException) {
        return res.status(401).json({ message: exception.message || 'Unauthorized' });
    }

    return res.status(500).json({ message: 'Internal Server Error' });
};
