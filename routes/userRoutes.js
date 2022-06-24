import { Router } from "express";
import { getRanking, getUserById } from "../controllers/userController.js";

import { validateToken } from "../middlewares/authValidation.js";

const userRouter = Router();

userRouter.get("/users/:id", validateToken, getUserById);
userRouter.get("/ranking", getRanking);


export default userRouter;