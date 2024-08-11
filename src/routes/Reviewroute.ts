import { createReview } from "../controllers/Review";
import { errorHandler } from "../erro-handler";
import authMiddleware from "../middlewares/auth";
import { Router } from "express";
const reviewRoutes:Router=Router();
reviewRoutes.post('/create',[authMiddleware],errorHandler(createReview))


export default reviewRoutes;
