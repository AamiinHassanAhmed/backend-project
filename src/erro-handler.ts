
import { Request, Response, NextFunction } from 'express'; // Added Request and Response imports
import { ErrorCode, HttpException } from './exceptions/root';
import { InternalException } from './exceptions/internal-exception';
import { ZodError } from 'zod';
import { BadRequestsException } from './exceptions/bad-requests';

export const errorHandler = (method: Function) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            method(req, res, next);
        } catch (error: any) {
            let exception: HttpException;
            if (error instanceof HttpException) {
                exception = error;
            } else {
                if(error instanceof ZodError){
                  exception = new BadRequestsException('Unprocessable Entity',ErrorCode.UNPROCESSABLE_ENTITY)
                }
                else{
                    exception = new InternalException('Something went wrong', error, ErrorCode.INTERNAL_EXCEPTION);
                }
               
            }
            next(exception);
        }
    };
};