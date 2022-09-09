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

const cadastroSchema = joi.object({
    name:joi.string().required(),
    email:joi.string().required(),
    password:joi.string().required(),
    passwordVerify:joi.string().required(),
})
const loginSchema = joi.object({
    email:joi.string().required(),
    password:joi.string().required(),
})
const movimentacaoSchema = joi.object({
    valor:joi.number().required(),
    descricao:joi.string().min(4).max(25).required(),
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

    const validation = movimentacaoSchema.validate(req.body, {abortEarly: false})
    if (validation.error){
        const erros = validation.error.details.map( e => e.message)
        return res.status(422).send(erros)
    }

    arr.push({
        valor,
        descricao,
        user
    })

    res.sendStatus(201)

})
server.post('/cadastro', function (req, res) {
    const validation = cadastroSchema.validate(req.body, {abortEarly: false})
    if (validation.error){
        const erros = validation.error.details.map(e => e.message)
        return res.status(422).send(erros)
    }
    res.send("chegou aqui")
})
server.post('/login', function (req, res) {

    const validation = loginSchema.validate(req.body, {abortEarly: false})
    if (validation.error){
        const erros = validation.error.details.map(e => e.message)
        return res.status(422).send(erros)
    }
    res.send("login feito com sucesso")

})

server.listen(5000, () => console.log("salve console"))