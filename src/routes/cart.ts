import { Router } from "express";
import { errorHandler } from "../erro-handler";
import { CreateProduct, deleteProduct, getProductById, GetProducts, updateProduct } from "../controllers/products";
import authMiddleware from "../middlewares/auth";
import adminMidleware from "../middlewares/admin";
import { CreateCart, DeleteCart, GetCartDetails, UpdateCart } from "../controllers/cart";
const cartRoutes:Router=Router()

cartRoutes.post('/create',[authMiddleware],errorHandler(CreateCart))
// delete cart route
cartRoutes.delete('/:id',[authMiddleware],errorHandler(DeleteCart))
//update products route
cartRoutes.put('/:id',[authMiddleware,adminMidleware],errorHandler(UpdateCart))
//get all cartdetile route
cartRoutes.get('/all',[authMiddleware],errorHandler(GetCartDetails))

export default cartRoutes;