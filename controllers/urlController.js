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
        const urlData = await db.query(`SELECT id, url, "shortUrl"  FROM urls WHERE id = $1`, [id])
        if(urlData.rowCount == 0) {
            return res.sendStatus(404);
        }
        const [url] = urlData.rows;

        res.send(url)
        
    } catch (error) {
        console.error(error)
        return res.sendStatus(500);
    }
}

export async function deleteUrl(req, res) {
    const { id } = req.params;
    const { user } = req.locals;
    try {
        const urlData = await db.query(`SELECT * FROM urls WHERE id = $1`, [id])
        if(urlData.rowCount == 0) {
            return res.sendStatus(404);
        }
        const [url] = urlData.rows;
        if(url.userId !== user.id){
            return res.sendStatus(401);
        }
        await db.query(`DELETE * FROM urls WHERE id = $1`, [id])
        res.sendStatus(204);

    } catch (error) {
        console.error(error)
        return res.sendStatus(500);
    }
}

export async function openShortUrl(req, res) {
    const { shortUrl } = req.params;
    try {
        const shortUrlData = await db.query(`SELECT * FROM urls WHERE "shortUrl" = $1`, [shortUrl])
        
        if(shortUrlData.rowCount == 0) {
            return res.sendStatus(404);
        }
        const [urlShort] = shortUrlData.rows;
        await db.query(`UPDATE urls SET "visitCount" = "visitCount" + 1 WHERE id = $1`, [urlShort.id])
        res.redirect(`https://${urlShort.urls}`);

    } catch (error) {
        console.error(error)
        return res.sendStatus(500);
    }
}
