import { Router } from "express";
import { deleteUrl, getUrlById, openShortUrl, shortenUrl } from "../controllers/urlController.js";
import { validateToken } from "../middlewares/authValidation.js";

const urlsRouter = Router();

urlsRouter.post("/urls/shorten", validateToken, shortenUrl);
urlsRouter.get("/urls/:id", getUrlById);
urlsRouter.delete("/urls/:id", validateToken, deleteUrl);
urlsRouter.post("/urls/open/:shortUrl", openShortUrl);

export default urlsRouter;