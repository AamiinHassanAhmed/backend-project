
import { Router } from 'express';
import { login, me, signup } from '../controllers/auth';
import { errorHandler } from '../erro-handler';
import authMiddleware from '../middlewares/auth';
// import { errorHandler } from '../error-handler'; // Corrected the import path

const authRoutes: Router = Router();

// New user signup route
authRoutes.post('/signup', errorHandler(signup));
 // Corrected the route path from 'singup' to 'signup'
authRoutes.get('/me',[authMiddleware],errorHandler(me));
// User login route
authRoutes.post('/login', errorHandler(login)); // Corrected the syntax for calling errorHandler

export default authRoutes;
