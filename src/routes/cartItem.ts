import { Router } from "express";
import { errorHandler } from "../erro-handler";
import authMiddleware from "../middlewares/auth";
import adminMidleware from "../middlewares/admin";
import { CreateCart, DeleteCart, GetCartDetails, UpdateCart } from "../controllers/cart";
import { AddToCart, GetCartItems, RemoveFromCart, UpdateCartItem } from "../controllers/cartItem";
const cartItem:Router=Router()

cartItem.post('/addtocart',errorHandler(AddToCart))
// delete removeFromcart route
cartItem.delete('/:id',[authMiddleware],errorHandler(RemoveFromCart))
//update cartItem route
cartItem.put('/:id',[authMiddleware],errorHandler(UpdateCartItem))
//get by id get route
cartItem.get('/:id',[authMiddleware],errorHandler(GetCartItems))
//get all cartdetile route
cartItem.get('/all',[authMiddleware],errorHandler(GetCartItems))

export default cartItem;