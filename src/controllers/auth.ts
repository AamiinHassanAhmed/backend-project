import { NextFunction, Request, Response } from "express";
import { prismaClient } from "..";
import { hashSync, compareSync } from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { JWT_SECRET } from "../secrets";
import { BadRequestsException } from "../exceptions/bad-requests";
import { ErrorCode } from "../exceptions/root";
import { UnprocessableEntity } from "../exceptions/validation";
import { SignUpSchema } from "../schema/users";
import { NotFoundException } from "../exceptions/not-found";

// Signup user
export const signup = async (req: Request, res: Response, next: NextFunction) => {
    try {
        SignUpSchema.parse(req.body);
        const { email, password, name } = req.body;

        // Check if the user is already in the database
        const checkUser = await prismaClient.user.findFirst({ where: { email } });
        if (checkUser) {
            return next(new BadRequestsException("User already exists in the database", ErrorCode.USER_ALREADY_EXISTS));
        }

        // Create a new user
        const newUser = await prismaClient.user.create({
            data: {
                name,
                email,
                password: hashSync(password, 10)
            }
        });

        res.json({
            user: newUser,
            message: "User created successfully"
        });
    } catch (err: any) {
        next(new UnprocessableEntity(err?.issues, "Unprocessable entity", ErrorCode.UNPROCESSABLE_ENTITY));
    }
};

// Login user
export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return next(new BadRequestsException('Missing email or password', ErrorCode.UNPROCESSABLE_ENTITY));  // 422 Unprocessable Entity status code for validation errors. 400 Bad Request status code for other validation errors.
        }

        // Check if the user is in the database
        const user = await prismaClient.user.findFirst({ where: { email } });
        if (!user) {
            return next(new NotFoundException('User not found', ErrorCode.USER_NOT_FOUND));
        }

        // Check if the password matches with the stored password
        if (!compareSync(password, user.password)) {
            return next(new BadRequestsException('Incorrect password', ErrorCode.INCORRECT_PASSWORD));
        }
        const token = jwt.sign({ user: user.id }, JWT_SECRET);

        res.json({ user, token });
    } catch (error) {
        return res.status(500).json({
            message: "Failed to login a user"
        });
    }
};




// me --> Return the logged in user 



// export const me = async (req : Request, res : Response) => {
//     return res.status(200).json({
//             // @ts-ignore
//             user : req.user
//         })
//     }
export const me = async (req : Request, res : Response) => {
    return res.status(200).json({
            // @ts-ignore
            user : req.user
        })
    }








