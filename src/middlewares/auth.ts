import { NextFunction, Request, Response } from "express"
import { UnauthorizeException } from "../exceptions/unathorized"
import { ErrorCode } from "../exceptions/root"
import { JWT_SECRET } from "../secrets"
import * as jwt from 'jsonwebtoken'
import { prismaClient } from ".."
import { types } from "util"



const authMiddleware = async (req:Request, res:Response, next:NextFunction)=>{
// 1.extarct the token from the headers
const token = req.headers.authorization
//2.if the is not token persent , return error of unauthorized
 if(!token){
    return next(new UnauthorizeException('unauthorized',ErrorCode.Unauthorize_Exception))
}try {
    //3.if the token   is  token persent , virfy the token and extract the playload
    const playload = jwt.verify(token,JWT_SECRET)as any;
    //4.to get the user from the playload
    const user = await prismaClient.user.findFirst({where:{ id: playload.userId}})
    if(!user){
        return next(new UnauthorizeException('unauthorized',ErrorCode.Unauthorize_Exception))
    }
    
    //5.to attch the user current request object
 // @ts-ignore
    req.user = user
    next()
} catch (error) {
    return next(new UnauthorizeException('unauthorized',ErrorCode.Unauthorize_Exception))
}



}

export default authMiddleware