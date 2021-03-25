const { Pool } = require('pg')
const keys = require(path.join(__dirname, '../config/keys'));
const express = require('express')

app = express();

const pool = new Pool({
    connectionString: keys.posgresqlURI,
    ssl: process.env.DATABASE_URL ? true : false
});