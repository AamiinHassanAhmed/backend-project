

import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { prismaClient } from "..";

const prisma = new PrismaClient();

// Add an item to the cart
export const AddToCart = async (req: Request, res: Response) => {
    try {
        const { cartId, productId, Quant } = req.body;

        const cart = await prisma.cart.findUnique({
            where: { Cr_Id: cartId },
            include: { Cart_Item: true },
        });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        const cartItem = await prismaClient.cart_Item.create({
            data: {
                Quant,
                Product: { connect: { Pr_Id: productId } },
                Cart: { connect: { Cr_Id: cartId } },
            },
        });

        res.status(201).json({ message: "Item added to cart", result: cartItem });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error adding item to cart" });
    }
};

// Delete an item from the cart
export const RemoveFromCart = async (req: Request, res: Response) => {
    try {
        const { cartItemId } = req.params;

        const deletedCartItem = await prismaClient.cart_Item.delete({
            where: { Ct_Id: +cartItemId },
        });

        res.status(200).json({ 
            message: "Item removed from cart", 
            result: deletedCartItem });
    } catch (error) {
        console.log(error);
        res.status(500).json({
             message: "Error removing item from cart" });
    }
};

// Get all items in the cart
// export const GetCartItems = async (req: Request, res: Response) => {
//     try {
//         const { cartId } = req.params;

//         const cart_Item = await prisma.cart_Item.findMany({
//             where: { Ct_Id: +req.params.id },
//             include: { Product: true },
//         });

//         res.status(200).json({ 
//             message: "Cart items retrieved",
//              result: cart_Item });
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({
//              message: "Error getting cart items" });
//     }
// };


export const GetCartItems = async (req: Request, res: Response) => {
    try {
        const cart_Item = await prisma.cart_Item.findMany({
            //@ts-ignore
            include: { Product: true },
        });

        res.status(200).json({
            message: "Success",
            result: cart_Item,
            // Cart_Item: {}

        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Failed to create new room.",
        });
    }
};






// Update quantity of an item in the cart

export const UpdateCartItem = async (req: Request, res: Response) => {
    try {
        const { Quant } = req.body;
        const cartItemId = parseInt(req.params.id); // Assuming 'id' is the ID of the cart item to update

        const existingCartItem = await prisma.cart_Item.findUnique({
            where: { Ct_Id: cartItemId }
        });

        if (!existingCartItem) {
            return res.status(404).json({
                message: "Cart item not found",
                isSuccess: false
            });
        }

        const updatedCartItem = await prisma.cart_Item.update({
            where: { Ct_Id: cartItemId },
            data: { Quant: Quant },
        });

        res.status(200).json({
            message: "Cart item updated",
            result: updatedCartItem
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error updating cart item"
        });
    }
};