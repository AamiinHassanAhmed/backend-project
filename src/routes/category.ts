// import { Router } from 'express';
// import authMiddleware from '../middlewares/auth';
// import { CreateCategory } from '../controllers/category';
// import { errorHandler } from '../erro-handler';
// const categoryRotuse:Router=Router()

// categoryRotuse.post('/',[authMiddleware],errorHandler(CreateCategory))



// export default categoryRotuse;
import authMiddleware from "../middlewares/auth";
import { Router } from "express";
import { errorHandler } from "../erro-handler"; // Corrected the import statement for error handler
import { CreateCategory, DeleteCategory, GetCategories, GetCategoryById, GetProductsByCategory,  UpdateCategory } from "../controllers/category";

const categoryRoutes: Router = Router();

categoryRoutes.post('/create', [authMiddleware], errorHandler(CreateCategory));
categoryRoutes.get('/', [authMiddleware], errorHandler(GetCategories)); // Updated the route path
categoryRoutes.put('/:id', [authMiddleware], errorHandler(UpdateCategory));
categoryRoutes.delete('/:id', [authMiddleware], errorHandler(DeleteCategory));
categoryRoutes.get('/:id', [authMiddleware], errorHandler(GetProductsByCategory));
categoryRoutes.get('/id/:id', [authMiddleware], errorHandler(GetCategoryById));

export default categoryRoutes;