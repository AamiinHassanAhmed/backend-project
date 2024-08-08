import { Router } from "express";
import authRoutes from "./auth";
import productsRoutes from "./products";
import UserRoutes from "./users";
import categoryRotuse from "./category";
import categoryRoutes from "./category";
import cartRoutes from "./cart";
import cartItem from "./cartItem";


const rootRouter: Router=Router();

// auth routes
rootRouter.use('/auth',authRoutes)

// cart routes
rootRouter.use('/cart',cartRoutes)

// cartItems routes
rootRouter.use('/cartItem',cartItem)
 
//category routes
rootRouter.use('/category',categoryRoutes)
 

// category routes

// product routes
rootRouter.use('/products',productsRoutes)

//Adress routes
rootRouter.use('/user',UserRoutes)
// rootRouter.use('/ardress',)

// / routes






export default rootRouter;