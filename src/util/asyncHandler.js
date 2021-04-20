/**
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 * @param {import('express').NextFunction} next 
 */
export const asyncHandler = (req, res, next) => (fn) => {
    return Promise.resolve(fn(req, res, next)).catch(next);
}