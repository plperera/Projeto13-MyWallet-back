import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import {MongoClient} from 'mongodb'
import joi from 'joi';
import dayjs from 'dayjs';

dotenv.config()

const server = express()
server.use(cors())
server.use(express.json())

const mongoClient = new MongoClient(process.env.MONGO_URI)
let db
mongoClient.connect().then(() => {
    db = mongoClient.db("mywallet")
})

server.listen(5000, () => console.log("salve console"))