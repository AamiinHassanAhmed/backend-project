import { Router } from "express";
import { errorHandler } from "../erro-handler";
import { CreateProduct, deleteProduct, getProductById, GetProducts, updateProduct } from "../controllers/products";
import authMiddleware from "../middlewares/auth";
import adminMidleware from "../middlewares/admin";
const productsRoutes:Router=Router()

productsRoutes.post('/',[authMiddleware],errorHandler(CreateProduct))
// delete products route
productsRoutes.delete('/:id',[authMiddleware,adminMidleware],errorHandler(deleteProduct))
//update products route
productsRoutes.put('/:id',[authMiddleware,adminMidleware],errorHandler(updateProduct))
//get by id product route
productsRoutes.get('/:id',[authMiddleware],errorHandler(getProductById))
//get all products route
productsRoutes.get('/',[authMiddleware],errorHandler(GetProducts))

export default productsRoutes;