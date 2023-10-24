require('dotenv').config()

const express = require('express')

const app = express()

const dbConnect = require('./config/database')

// Database Connection Configuration
dbConnect()

app.get('/', (req,res) => res.json('hello world'))

app.listen(process.env.PORT, _ => console.log(`App running on http://localhost:${process.env.PORT}`))