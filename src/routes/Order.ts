import { createOrder } from "../controllers/Order";
import { errorHandler } from "../erro-handler";
import authMiddleware from "../middlewares/auth";
import { Router } from "express";
const orderRoutes:Router=Router();
orderRoutes.post('/create',[authMiddleware],errorHandler(createOrder))


export default orderRoutes;
