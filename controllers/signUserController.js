import userSchema from "../utils/userSchema.js";
import loginSchema from "../utils/loginSchema.js"
import db from "./../database/db.js"
import bcrypt from 'bcrypt';
import { v4 as uuid} from "uuid";


export async function newUser(req, res) {
    const user = req.body;
    const {error} = userSchema.validate(user)
    if(error) {
        return res.status(422).send(error)
    }
    try{
        const emailFromBd = await db.query('SELECT * FROM users WHERE email = $1', [user.email]);
        if(emailFromBd.rowCount > 0){
            return res.sendStatus(409);
        }

        const {name, email, password} = user;

        const SALT = 9
        const paswordHash = bcrypt.hashSync(password, SALT)

        await db.query(`INSERT INTO users (name, email, password) VALUES ( $1, $2, $3)`, [name, email, paswordHash])
        res.sendStatus(201);

    } catch (error) {
        console.error(error);
        return res.sendStatus(500);
    }
}

export async function loginUser(req, res) {
    const loginBody = req.body;
    const {error} = loginSchema.validate(loginBody)
    if(error) {
        return res.status(422).send(error)
    }
    const {email, password} = loginBody
    const {rows: users} = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    const [user] = users;
    if(!user) {
        return res.sendStatus(401)
    }
    if(bcrypt.compareSync(password, user.password)){
        const token = uuid();
        await db.query('INSERT INTO sessions (token, "userId") VALUES ($1, $2)', [token, user.id])
        return res.send(token)
    }else{
        return res.sendStatus(401)
    }
}