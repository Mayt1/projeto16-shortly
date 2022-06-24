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
    
}

export async function deleteUrl(req, res) {
    
}

export async function openShortUrl(req, res) {
    
}
