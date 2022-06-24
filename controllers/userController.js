import { nanoid } from "nanoid";
import db from "../database/db.js";


export async function getUserById(req, res) {
    const {id} = req.params;
    const { user } = res.locals;
    if(id != user.id){
        return res.sendStatus(401);
    }
    try {
        const visitContData = await db.query(`SELECT SUM(u."visitCount") FROM urls u WHERE u."userId" = $1`, [user.id])
        const [visitCount] = visitContData.rows;

        const urlsData =  await db.query(`SELECT * FROM urls WHERE urls."userId" = $1`, [user.id])
        const [userUrls] = urlsData.rows;

        res.send({
            id:user.id,
            name: user.name,
            visitCount: visitCount.sum || 0,
            shortnedUrls: userUrls
        })
        
    } catch (error) {
        console.error(error)
        return res.sendStatus(500)
    }
}

export async function getRanking(req, res) {
    try {
        const algo = await db.query(`SELECT usr.id, usr.name, COUNT(u.id) as "linksCount", 
        SUM(u."visitCount") as "visitCount" FROM urls u
        JOIN users usr ON u."userId" = usr.id
        GROUP BY usr.id
        ORDER BY "visitCount" DESC LIMIT 10
        `)
        res.send(algo.rows)
    } catch (error) {
        console.error(error)
        return res.sendStatus(500)
    }
}