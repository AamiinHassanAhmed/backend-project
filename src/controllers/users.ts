

import { Request, Response } from 'express';
import { AddressSchema, UpdateUserSchema } from '../schema/users';
import { NotFoundException } from '../exceptions/not-found';
import { ErrorCode } from '../exceptions/root';
import { Address, User } from '@prisma/client';
import { prismaClient } from '..';





export const addAddress = async (req: Request, res: Response) => {
    try {
        AddressSchema.parse(req.body);
        
        const user = await prismaClient.user.findFirst({
            where: {
                id: req.body.userId
            }
        });

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        const address = await prismaClient.address.create({
            data: {
                ...req.body,
                //@ts-ignore
                userId: req.user.id
            }
        });

        res.status(201).json(address);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Failed to add address",
        });
    }
};

/// DeleteAddress



// export const deleteAddress = async (req: Request, res: Response) => {
//     try {
//         //@ts-ignore
//         const userId = req.user?.id; // Using optional chaining to access user.id
//         const addressId = +req.params.id; // Assuming the address ID is in the request params

//         if (!userId) {
//             return res.status(400).json({
//                 message: "User ID is missing in the request",
//             });
//         }

//         const user = await prismaClient.user.findFirst({
//             where: {
//                 id: userId
//             },
//             include: {
//                 adddresses: true
//             }
//         });

//         if (!user) {
//             return res.status(404).json({
//                 message: "User not found",
//             });
//         }
//               //@ts-ignore
//         const addressToDelete = user.addresses.find((address) => address.id === addressId);

//         if (!addressToDelete) {
//             return res.status(404).json({
//                 message: "Address not found for this user",
//             });
//         }

//         await prismaClient.address.delete({
//             where: {
//                 id: addressId
//             }
//         });

//         res.json({
//             message: "Address deleted successfully"
//         });
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({
//             message: "Failed to delete address",
//         });
//     }
// };


export const deleteAddress = async (req:Request,res:Response)=>{
    try {
        await prismaClient.address.delete({
            where: {
                id: +req.params.id
            }
        })
    } catch (error) {
        return new NotFoundException('Address not found',ErrorCode.USER_NOT_FOUND)
    }
}






// ListAddresses
export const listAddress = async (req: Request, res: Response) => {
    try {
        //@ts-ignore

        const userId = req.user.id; // Assuming the user ID is available in req.user

        const user = await prismaClient.user.findUnique({
            where: {
                id: userId
            },
            include: {
                adddresses: true
            }
        });

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        res.json(user.adddresses);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Failed to fetch addresses",
        });
    }
};



// updateUser
export const updateUser = async (req:Request,res:Response) => {
    const ValidatedDta = 
    UpdateUserSchema.parse(req.body);
    let shippingAddress:Address;
    let billinggAddress:Address;
    if (ValidatedDta.defaultShippingAddressId){
        try {
            //@ts-ignore
            shippingAddress = await prismaClient.address.findFirst({
    
                where: {
            //@ts-ignore
                    
                    id: ValidatedDta.defaultShippingAddressId
                }
            })
            
        } catch (error) {
            return new NotFoundException('Address not found',ErrorCode.USER_NOT_FOUND)
        }
    }


    if (ValidatedDta.defaultBillinggAddressId){
        try {
            //@ts-ignore
            billinggAddress = await prismaClient.address.findFirst({
    
                where: {
            //@ts-ignore
                    
                    id: ValidatedDta.defaultBillinggAddressId
                }
            })

            const updateUser = await prismaClient.address.update({
                where:{
                    //@ts-ignore
                    id: req.params.id
                },
                    //@ts-ignore

                data:ValidatedDta
            })
            
        } catch (error) {
            return new NotFoundException('Address not found',ErrorCode.USER_NOT_FOUND)
        }
    }
 
}