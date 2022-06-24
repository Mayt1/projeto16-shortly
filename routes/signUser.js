import { Router } from "express";
import { newUser, loginUser } from "../controllers/signUserController.js";


const signUser = Router();

signUser.post("/signup", newUser);
signUser.post("/signin", loginUser);

export default signUser;