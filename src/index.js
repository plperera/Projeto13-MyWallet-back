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


let arr = []

server.get('/historico/:user', function (req, res) {

    const {user} = req.params
    console.log(user)
    res.send(arr.filter((e)=>e.user === user))
})
server.post('/historico', function (req, res) {

    const {valor, descricao} = req.body
    const {user} = req.headers

    arr.push({
        valor,
        descricao,
        user
    })

    res.sendStatus(201)

})

server.listen(5000, () => console.log("salve console"))