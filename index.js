import express from "express"
import dotenv from "dotenv"
import {json} from "express"

dotenv.config();

const app = express();

app.use(json());

const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log("Server funcionando")
})