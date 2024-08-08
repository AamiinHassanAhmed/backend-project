import { Router } from "express";
import authMiddleware from "../middlewares/auth";
import adminMidleware from "../middlewares/admin";
import { errorHandler } from "../erro-handler";
import { addAddress, deleteAddress, listAddress, updateUser } from "../controllers/users";




const UserRoutes:Router=Router();
//post address routes
UserRoutes.post('/adress',[authMiddleware],errorHandler(addAddress))
// delete adress routes
UserRoutes.delete('/adress:id',[authMiddleware],errorHandler(deleteAddress))
// get adress routes
UserRoutes.get('/adress',[authMiddleware],errorHandler(listAddress))
// update user routes
UserRoutes.put('/',[authMiddleware],errorHandler(updateUser))



export default UserRoutes;

