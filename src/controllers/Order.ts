import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client';
import { prismaClient } from '..';
const prisma = new PrismaClient();
// create order object

// export const createOrder = async (req: Request, res: Response) => {
//     try {
//         const { totalAmount, userId } = req.body;


//         // Check if the user exists
//         const user = await prisma.user.findFirst({
//             where: {
//                 id: userId
//             }
//         });
//         if (!user) {
//             return res.status(404).json({
//                 error: 'User not found'
//             });
//         }
//         // Create the order using Prisma
//         const newOrder = await prisma.order.create({
//             data: {
//                 Or_Status: 'Not_Delivered',
//                 // Items: { set: items },
//                 Or_Total: totalAmount,
//                 isPaid: false,
//                 Cr_Id: 0, // Assuming a default value for Cr_Id
//                 Author_Id: userId,
//                 User: { connect: { id: userId } }
//             }
//         });

//         // Send a success response
//         res.status(200).json({
//             message: 'Order created successfully',
//             data: newOrder
//         });
//     } catch (error) {
//         console.error('Error creating order:', error);
//         res.status(500).json({
//             error: 'An error occurred while creating the order'
//         });
//     }
// };


// export const createOrder = async (req:Request, res:Response) => {
//     try {
//         const { totalAmount, userId } = req.body;

//         // Check if the user exists
//         const user = await prisma.user.findFirst({
//             where: {
//                 id: userId
//             }
//         });
//         if (!user) {
//             return res.status(404).json({
//                 error: 'User not found'
//             });
//         }

//         // Create the order using Prisma
//         const newOrder = await prisma.order.create({
//             data: {
//                 Or_Status: 'Not_Delivered',
//                 Or_Total: totalAmount,
//                 isPaid: false,
//                 Cr_Id: 0, // Assuming a default value for Cr_Id
//                 Author_Id: userId,
//                 User: { connect: { id: userId } }
//             }
//         });

//         // Send a success response
//         res.status(200).json({
//             message: 'Order created successfully',
//             data: newOrder
//         });
//     } catch (error) {
//         console.error('Error creating order:', error);
//         res.status(500).json({
//             error: 'An error occurred while creating the order'
//         });
//     }
// };




export const createOrder = async (req:Request, res:Response) => {
    try {
        const { Or_Total, userId } = req.body;

        // Check if the user exists
        const user = await prisma.user.findFirst({
            where: {
                id: userId
            }
        });
        if (!user) {
            return res.status(404).json({
                error: 'User not found'
            });
        }

        // Create the order using Prisma
        const newOrder = await prisma.order.create({
            data: {
                Or_Status: 'Not_Delivered',
                Or_Total: Or_Total, // Include the total amount here
                isPaid: false,
                Cr_Id: 0, // Assuming a default value for Cr_Id
                Author_Id: userId,
                User: { connect: { id: userId } }
            }
        });

        // Send a success response
        res.status(200).json({
            message: 'Order created successfully',
            data: newOrder
        });
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({
            error: 'An error occurred while creating the order'
        });
    }
};

export default createOrder;


// get order by id

export const GetOrderById = async (req: Request, res: Response) => {

};

// get orders by user id

export const GetOrdersByUserId = async (req: Request, res: Response) => {

};

// update order status

export const UpdateOrderStatus = async (req: Request, res: Response) => {

};

// delete order

export const DeleteOrder = async (req: Request, res: Response) => {

};

// get orders by status

export const GetOrdersByStatus = async (req: Request, res: Response) => {

};

// get orders by date

export const GetOrdersByDate = async (req: Request, res: Response) => {

};

// get orders by product id

export const GetOrdersByProductId = async (req: Request, res: Response) => {

};

// get orders by customer id

export const GetOrdersByCustomerId = async (req: Request, res: Response) => {

};

// get orders by shipping address

export const GetOrdersByShippingAddress = async (req: Request, res: Response) => {

};

// get orders by billing address

export const GetOrdersByBillingAddress = async (req: Request, res: Response) => {

};

// get orders by payment method

export const GetOrdersByPaymentMethod = async (req: Request, res: Response) => {

};

// get orders by total amount