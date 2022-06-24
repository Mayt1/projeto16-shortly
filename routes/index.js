import { Router } from "express";
import signUser from "./signUser.js"
import urlsRouter from "./urlRouter.js";
import userRouter from "./userRoutes.js";


const routes = Router();
routes.use(signUser);
routes.use(urlsRouter);
routes.use(userRouter);



export default routes;