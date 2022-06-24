import { Router } from "express";
import signUser from "./signUser.js"


const routes = Router();
routes.use(signUser);



export default routes;