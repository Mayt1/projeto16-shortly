import { Router } from "express";

const signUser = Router();

signUser.post("/signup", newUser);
signUser.post("/signin", loginUser);

export default authRouter;