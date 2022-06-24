import { nanoid } from "nanoid";
import db from "../database/db.js";


export async function shortenUrl(req, res) {
    const { id } = res.locals.user;
    const { url } = req.body;
    
    const NUM_CHARS = 10;
    const shortUrl = nanoid(NUM_CHARS);
    try {
        await db.query(`INSERT INTO urls(url, "shortUrl", "userId") VALUES ($1, $2, $3)`, [url, shortUrl, id])
        res.status(201).send({shortUrl})
    } catch (error) {
        console.error(error)
        return res.sendStatus(500);
    }
}

export async function getUrlById(req, res) {
    const { id } = req.params;
    try {
        const urlData = await db.query(`SELECT * FROM urls WHERE id = $1`, [id])
        if(urlData.rowCount == 0) {
            return res.sendStatus(404);
        }
        const [url] = urlData.rows;
        delete url.visitCount;
        delete url.userId;
        delete url.createdAt;

        res.send(url)
        
    } catch (error) {
        console.error(error)
        return res.sendStatus(500);
    }
}

export async function deleteUrl(req, res) {
    
}

export async function openShortUrl(req, res) {
    
}
