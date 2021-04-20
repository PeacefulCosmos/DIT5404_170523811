class Exception {
    constructor(message = '') {
        this.message = message;
    }
}

export class NotFoundException extends Exception {}

export class UnauthorizedException extends Exception {}