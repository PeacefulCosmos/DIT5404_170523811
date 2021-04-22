class Exception {
    constructor(message = '') {
        this.message = message;
    }
}

export class BadRequestException extends Exception {}

export class NotFoundException extends Exception {}

export class UnauthorizedException extends Exception {}
