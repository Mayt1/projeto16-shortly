import express from "express"
import dotenv from "dotenv"
import {json} from "express"
import cors from "cors"
import routes from "./routes/index.js"

dotenv.config();
const app = express();
app.use(cors());
app.use(json());


// app.get("/signup", (req,res) => {

// })
app.use(routes)

const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log("Server funcionando")
})