import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { prismaClient } from "..";
import { NotFoundException } from "../exceptions/not-found";
import { ErrorCode } from "../exceptions/root";

const prisma = new PrismaClient();



// Create a new cart
export const CreateCart = async (req: Request, res: Response) => {
    try {
        //@ts-ignore
        const userId = req.user.id;

        if (!userId) {
            return res.status(400).json({
                 message: 'User ID not found in request' });
        }
        const newCart = await prisma.cart.create({
            //@ts-ignore
            data: {
                U_Id: userId,
                // Add any other necessary data for the cart creation
            },
        });
        res.status(201).json({ 
            message: 'Cart created successfully',
             result: newCart });
    } catch (error) {
        // console.error(error);
        res.status(500).json({ message: 'Error creating cart' });
    }
};

// isDeleted ture cart

export const DeleteCart = async (req: Request, res: Response) => {
    try {
        const { Cr_Id } = req.params;

        const checkCart = await prismaClient.cart.findFirst({
            where: {
                Cr_Id: +Cr_Id,
            },
        });

        if (!checkCart) {
            return res.status(404).json({
                message: `There is no cart with ID of ${Cr_Id}`,
            });
        }
        const deletedcart = await prismaClient.cart.update({
            where: {

                Cr_Id: +Cr_Id,
            },
            data: {
                Is_Deleted: true,

            }
        });
        return res.status(200).json({
            message: "Success",
            result: deletedcart,
        });
    } catch (error) {
        // console.log(error);
        return res.status(500).json({
            message: "Failed to delet cart .",
        });
    }
};

// get the  cart information
export const GetCartDetails = async (req: Request, res: Response) => {
    try {
        const cart = await prisma.cart.findMany({
            //@ts-ignore
            include: { Cart_Item: true },
        });

        res.status(200).json({
            message: "Success",
            result: cart,
            Cart_Item: {}

        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Failed to create new room.",
        });
    }
};


// Update cart details
export const UpdateCart = async (req: Request, res: Response) => {
    try {
        const { cartId } = req.params;
        const { /* Update fields */ } = req.body;

        const updatedCart = await prisma.cart.update({
            where: { Cr_Id: +cartId },
            data: {
                // Update fields as needed
            },
        });

        res.status(200).json({ message: "Cart updated successfully", result: updatedCart });
    } catch (error) {
        res.status(500).json({ message: "Error updating cart" });
    }
};