import { Request, Response } from "express"
// import { prisma } from "..";
// import { prisma } from "@prisma/client";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()








// export const CreateCategory = async (req: Request, res: Response) => {
//     try {
//         const { Ca_Name, Ca_Desc, Ca_Image } = req.body;
//         // @ts-ignore
//         const Author_Id = req.user.id;

//         const checkCategory = await prisma.Category.findFirst({
//             where: {
//                 Ca_Name: Ca_Name,
//             },
//           });

//           if (checkCategory) {
//             return res.status(400).json({
//               message: `category with name : ${Ca_Name} is already created. `,
//             });
//           }

//           if (!Ca_Name || !Ca_Desc ) {
//             return res.status(400).json({
//               message: "Validation Error.",
//             });
//           }
//           const newCategory = await prisma.Category.create({
//             data: {
//               Ca_Name,
//               Ca_Desc,
//               Ca_Image,
//               user_id: Author_Id,
//             },
//           });

//           res.status(201).json({
//             message: "Success",
//             result: Category,
//           });


//     } catch (error) {
//         return res.status(404).json({
//             message:"Error creating category",
//             isSuccess:false,
//         })
//     }
// }


export const CreateCategory = async (req: Request, res: Response) => {
    try {
        const { Ca_Name, Ca_Desc, Ca_Image } = req.body;
        // @ts-ignore



        if (!Ca_Name || !Ca_Desc) {
            return res.status(400).json({
                message: "Validation Error: 'Ca_Name' and 'Ca_Desc' are required fields.",
            });
        }

        const checkCategory = await prisma.category.findFirst({
            where: {
                Ca_Name: Ca_Name,
            },
        });

        if (checkCategory) {
            return res.status(400).json({
                message: `Category with name '${Ca_Name}' already exists.`,
            });
        }



        const newCategory = await prisma.category.create({
            data: {
                Ca_Name,
                Ca_Desc,
                Ca_Image,
                Author_Id: req.user.id!,
            },
        });

        res.status(201).json({
            message: "Category created successfully",
            result: newCategory,
        });

    } catch (error) {
        return res.status(500).json({
            message: "Error creating category",
            isSuccess: false,
        });
    }
};







export const GetCategories = async (req: Request, res: Response) => {
    try {

        const category = await prisma.category.findMany({
            include: {
                Product: true,
            },
        });
        if (!category) return res.status(401).json({
            message: "No category found",
            isSuccess: false,
        })

        res.status(200).json({
            message: "Success",
            result: category,

        })

    } catch (error) {
        return res.status(404).json({
            message: "Error Get category",
            isSuccess: false,
        })
    }
}



export const UpdateCategory = async (req: Request, res: Response) => {
    try {
        // Assuming categoryId is the ID of the category to update
        const { Ca_Id } = req.params
        const { Ca_Name, Ca_Desc } = req.body; // Assuming the request body contains the updated name and description
        const checkcategory = await prisma.category.findFirst({
            where: { Ca_Id: +Ca_Id, Is_Deleted: false }

        });

        if (!checkcategory) {
            return res.status(404).json({
                message: "Product not found",
            });
        }
        // Update the category in the database
        const updatedCategory = await prisma.category.update({
            where: {
                Ca_Id: +Ca_Id// Assuming 'id' is the primary key field for categories and parsing categoryId to an integer
            },
            data: {
                Ca_Name,
                Ca_Desc,
                Author_Id: req.user.id!
            }
        });

        return res.status(200).json({
            message: "Category updated successfully",
            isSuccess: true,
            category: updatedCategory

        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Error updating category",
            isSuccess: false
        });
    }
};


export const DeleteCategory = async (req: Request, res: Response) => {
    try {

        const { id } = req.params;

        const checkCategory = await prisma.category.findFirst({
            where: {
                Ca_Id: +id,
                Is_Deleted: true
            },
        });

        if (!checkCategory) {
            return res.status(404).json({
                message: `There is no category with ID of ${id}`,
            });
        }

        const deletedcategory = await prisma.category.delete({
            where: {
                Ca_Id: +id,
            },
        });

        return res.status(200).json({
            message: "Success",
            result: deletedcategory,
        });

    } catch (error) {
        return res.status(404).json({
            message: "Error Delete category",
            isSuccess: false,
        })
    }
}
// get all  by category br id

export const GetCategoryById = async (req: Request, res: Response) => {
    try {

        const { Ca_Id } = req.params
        const ckeckCategory = await prisma.category.findFirst({
            where: {
                Ca_Id: +Ca_Id
            },
            include: {
                Product: true,
            },
        });

        if (!ckeckCategory) {
            return res.status(404).json({
                message: "Category not found",
            });
        }

        return res.status(200).json({
            message: "Category retrieved successfully",
            isSuccess: true,
            category: ckeckCategory
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Error retrieving category by ID",
            isSuccess: false
        });
    }
};



