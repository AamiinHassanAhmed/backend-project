import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import { prismaClient } from "..";

export const createReview = async (req:Request, res:Response) => {
    try {
        
        const { Rating, Comment,  Pr_Id } = req.body;
        //@ts-ignore
        const Author_Id = req.user.id;

        const newReview = await prismaClient.review.create({
            data: {
                Rating,
                Comment,
                Pr_Id,
                User: { connect: { id: Author_Id } },
                Product: { connect: { Pr_Id } }
            }
        });

        res.status(201).json({ message: 'Review created successfully', data: newReview });
    } catch (error) {
        console.error('Error creating review:', error);
        res.status(500).json({ error: 'An error occurred while creating the review' });
    }
};