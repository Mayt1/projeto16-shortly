import { Router } from "express";
import signUser from "./signUser.js/index.js.js";
import usersRoutes from "./users/index.js";
import publish from "./publish/index.js";

const routes = Router();
routes.use(signUser);



export default routes;