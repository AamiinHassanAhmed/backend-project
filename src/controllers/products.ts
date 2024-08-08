import { Request, Response } from "express";
// import { prismaClient } from "..";
import { NotFoundException } from "../exceptions/not-found";
import { ErrorCode } from "../exceptions/root";
import { PrismaClient } from "@prisma/client";



const PAGE_SIZE = 10;
const prisma = new PrismaClient()




// export const CreateProduct = async (req: Request, res: Response) => {
//     try {
//         const { Author_id, category_id, ...Product } = req.body; // Destructure Author_id and category_id
//         const product = await prismaClient.product.create({
//             data: {
//                 ...Product,
//                 tags: req.body.tags.join(','),
//                 user: { connect: { id: Author_id } }, // Connect the Author by id
//                 Category: { connect: { Ca_Id: category_id } } // Connect the Category by Ca_Id
//             }
//         });

//         res.json(product);
//     } catch (error) {
//         res.status(500).json({ error: "Failed to create product" });
//     }
// };




const prismaClient = new PrismaClient();

export const CreateProduct = async (req: Request, res: Response) => {
    try {
        const checkCategory = await prismaClient.category.findUnique({
            where: { Ca_Id: req.body.category_id }
        })
        if (!checkCategory) {
            return res.status(400).json({ 
                message: "Invalid category id" });
        }
        const { Author_id, category_id, Pr_Name, Pr_Desc, Pr_Price, Pr_Quantity, tags } = req.body;

        const product = await prismaClient.product.create({
            data: {
                Pr_Name,
                Pr_Desc,
                Pr_Price,
                Pr_Quantity,
                tags: tags ? tags.join(',') : '', // Ensure tags is an array before joining
                User: { connect: { id: Author_id } },
                category: { connect: { Ca_Id: category_id } }
            }
        });

        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to create product" });
    }
};










export const GetProducts = async (req: Request, res: Response) => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const offset = (page - 1) * PAGE_SIZE;

        const totalproduct = await prisma.product.count();
        const totalPages = Math.ceil(totalproduct / PAGE_SIZE);

        const product = await prisma.product.findMany({
            skip: offset,
            take: PAGE_SIZE,
        });

        res.status(200).json({
            message: "Success",
            result: product.map((product) => {
                const { ...rest } = product;
                return rest;
            }),
            meta: {
                currentPage: page,
                totalPages,
                pageSize: PAGE_SIZE,
                totalproduct,
                product: Number(product)
            },
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Failed to list users.",
        });
    }
};



// udateProduct
export const updateProduct = async (req: Request, res: Response) => {
    try {
        let productData = req.body;

        if (productData.tags) {
            productData.tags = productData.tags.join(',');
        }

        const checkProduct = await prismaClient.product.findFirst({
            where: { Pr_Id: +req.params.id, Is_Deleted: true }
        });

        if (checkProduct) {
            return res.status(404).json({
                message: "Product is deleted",
            });
        }

        const updatedProduct = await prismaClient.product.update({
            where: { Pr_Id: +req.params.id },
            data: {
                ...productData,
                Published: true,
                Arrival: true,
            }
        });

        res.json(updatedProduct);
    } catch (err) {
        // console.log(err);
        return res.status(500).json({
            message: "Failed to update product",
        });
    }
};


//deleteProduct
export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const checkProduct = await prismaClient.product.findFirst({
            where: { Pr_Id: +req.params.id, Is_Deleted: false }
        });

        if (!checkProduct) {
            return res.status(404).json({
                message: "Product not found",
            });
        }

        const deletedProduct = await prismaClient.product.update({
            where: { Pr_Id: +req.params.id },
            data: {
                Is_Deleted: true
            }
        });

        if (!deletedProduct) {
            throw new NotFoundException('Product not found', ErrorCode.ProductNotFound);
        }

        res.json({ message: "Product deleted successfully" });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Failed to delete product",
        });
    }
};


//get product by id
// export const getProductById =async(req: Request, res: Response)=>{
//     try {
//         const product = await prismaClient.product.findUnique({
//             where: { Pr_Id: +req.params.id }
//         });
//         if (!product) {
//             return new NotFoundException('Product not found', ErrorCode.ProductNotFound);
//         }
//         res.json(product);

//     } catch (err) {
//         return new NotFoundException('Product not found', ErrorCode.ProductNotFound);
//     }

// }

export const getProductById = async (req: Request, res: Response) => {
    try {
        const product = await prismaClient.product.findUnique({
            where: { Pr_Id: +req.params.id ,
                Is_Deleted: false ,

            }
        });

        if (!product) {
            return res.status(404).json({
                message: "Product not found",
            });
        }

        res.json(product);

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Failed to retrieve product",
        });
    }
};
