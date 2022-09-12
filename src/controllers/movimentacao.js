import joi from 'joi';
import db from '../database/db.js';
import dayjs from 'dayjs'

const movimentacaoSchema = joi.object({
    valor:joi.number().required(),
    descricao:joi.string().min(4).max(25).required(),
})

async function HistoricoMovimentacao(req, res){

    const token = req.headers.authorization?.replace("Bearer ", "")
    try {
        const sessions = await db.collection('sessions').findOne({token})
        if(!sessions) return res.status(401).send("sua sessão expirou :(") 
        else {
            const arr = await db.collection('movimentacoes').find({userID: sessions.userID}).toArray()
            return res.send(arr)
        }
    } catch (error) {
        console.log(error)
    }    
}

async function NovaMovimentacao(req, res) {

    const {valor, descricao} = req.body
    const token = req.headers.authorization?.replace("Bearer ", "")

    const validation = movimentacaoSchema.validate(req.body, {abortEarly: false})
    if (validation.error){
        const erros = validation.error.details.map( e => e.message)
        return res.status(422).send(erros)
    }
    
    try {
 
        const sessions = await db.collection('sessions').findOne({token})
        
        if(!sessions) return res.status(401).send("sua sessão expirou :(")
        else {
            await db.collection('movimentacoes').insertOne({
                data:dayjs().locale('pt-br').format('DD:MM'),
                userID: sessions.userID,
                descricao,
                valor
            })
            return res.sendStatus(201)
        }

    } catch (error) {
        console.log(error)
    }
}

export {HistoricoMovimentacao, NovaMovimentacao}