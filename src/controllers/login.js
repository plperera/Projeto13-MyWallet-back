import joi from 'joi';
import bcrypt from 'bcrypt';
import db from '../database/db.js'
import {v4 as uuid} from 'uuid'

const loginSchema = joi.object({
    email:joi.string().required(),
    password:joi.string().required(),
})

async function NovoLogin(req, res){
    const {email, password} = req.body

    const validation = loginSchema.validate(req.body, {abortEarly: false})
    if (validation.error){
        const erros = validation.error.details.map(e => e.message)
        return res.status(422).send(erros)
    }
    const user = await db.collection('users').findOne({email})

    if( user && bcrypt.compareSync(password, user.passwordHash)){
        
        const token = uuid()
        await db.collection('sessions').insertOne({
            token,
            userID: user._id,
            time: Date.now()
        })
        return res.send({token, name: user.name})
    } else { 
        return res.status(401)
    }  
}

export {NovoLogin}