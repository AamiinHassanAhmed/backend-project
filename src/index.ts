import  express from "express";
// import { PORT } from "./secrets";
import rootRouter from "./routes/allRoutes";
import { PrismaClient } from "@prisma/client";
import { SignUpSchema } from "./schema/users";
import { errorMiddleware } from "./middlewares/errors";
const app = express();

app.use(express.json());
app.use('/api',rootRouter);
app.use(errorMiddleware)

const error = new Error('Server Error');
export const prismaClient = new PrismaClient   (
    // {
    //     log:['query']
    // }
)

app.listen(process.env.PORT, () => {
    console.log(Error)
    console.log('Server is running on ' + process.env.PORT);
  }); 