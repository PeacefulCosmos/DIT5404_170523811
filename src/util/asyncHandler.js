/**
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 * @param {import('express').NextFunction} next 
 */
export const asyncHandler = (fn) => (req, res, next)  => {
    return Promise.resolve(fn(req, res, next)).catch(next);
}