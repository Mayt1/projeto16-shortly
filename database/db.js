import pg from "pg";

import dotenv from "dotenv"

dotenv.config();

const { Pool } = pg;
const config = {
    connectionString: process.env.DATABASE_URL
}

if(process.env.MODE === "PROD"){
    configDatabase.ssl = {
        rejectUnauthorized: false
    }
}

const db = new Pool(config);
export default db;

