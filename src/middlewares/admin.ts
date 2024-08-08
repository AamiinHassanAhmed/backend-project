import { NextFunction, Request, Response, } from "express";
import { UnauthorizeException } from "../exceptions/unathorized";
import { ErrorCode } from "../exceptions/root";

const adminMidleware = async (req:Request, res:Response, next:NextFunction) => {
    //@ts-ignore
const user = req.user
if(user.Role == 'Admin'){
    next()
}
else {
    return next(new UnauthorizeException('unauthorized',ErrorCode.Unauthorize_Exception))
}
}

export default adminMidleware;