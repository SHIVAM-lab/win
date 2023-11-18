import { Request, Response, NextFunction } from 'express';

export const errorHandler = (error: HttpException, request: Request, response: Response, next: NextFunction) => {
    const status = "404";
    console.log(status, `line log :: 7 error handler`);
    
    response.status(status).send(error);
    next();
};
