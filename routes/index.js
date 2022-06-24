import { Router } from "express";
import signUser from "./signUser.js"
import urlsRouter from "./urlRouter.js";


const routes = Router();
routes.use(signUser);
routes.use(urlsRouter);



export default routes;