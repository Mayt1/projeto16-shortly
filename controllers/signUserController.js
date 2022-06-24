import userSchema from "../utils/userSchema";
import db from "./../database/db.js"
import bcrypt from 'bcrypt';
import { verify } from "crypto";

export async function newUser(req, res) {
    const user = req.body;
    const {error} = userSchema.validate(user)
    if(error) {
        return res.status(422).send(error)
    }
    try{
        await selectPosts()
        const emailFromBd = await db.query('SELECT * FROM users WHERE email = $1', [user.email]);
        if(emailFromBd.rowCount > 0){
            return res.sendStatus(409);
        }

        const {name, email, password} = user;

        const paswordHash = bcrypt.hashSync(password, process.env.PASSKEY)

        await db.query(`INSERT INTO users (name, emai, password) VALUES ( $1, $2, $3)`, [name, email, paswordHash])
        res.sendStatus(201);

    } catch (error) {
        console.error(error);
        return res.sendStatus(500);
    }


}

export async function loginUser(req, res) {

}