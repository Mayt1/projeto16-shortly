import db from "../database/db.js"

export async function validateToken(req, res, next) {
    const {authorization} = req.headers
    const token = authorization?.replace("Bearer ", "");
    if(!token){
        return res.send(401).status("token nao encontrado");
    }
    // const userId = user.id;
    // db.query(`INSERT INTO sessions (token, "userId") VALUES ($1, $2)`, [token, userId])
    try{
        const { rows: sessions } = await db.query(`SELECT * FROM sessions WHERE token = $1`,[token])
        const [session] = sessions;
        if(!session){
            return res.send(401).send("sessao nao encontrada")
        }
        
        const { rows: users } = await db.query(`SELECT * FROM users WHERE id = $1`, [session.userId]);
        const [user] = users;
        if(!user){
            return res.send(401).send("usuario nao encontrado")
        }

        res.locals.user = user;
        next();

    } catch (error){
        console.error(error);
        return res.sendStatus(500);
    }
    
    

}