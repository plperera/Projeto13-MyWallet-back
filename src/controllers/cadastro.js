import joi from 'joi';
import bcrypt from 'bcrypt';
import db from '../database/db.js'

const cadastroSchema = joi.object({
    name:joi.string().required(),
    email:joi.string().required(),
    password:joi.string().required(),
    passwordVerify:joi.string().required(),
})

async function NovoCadastro(req, res){
    const {name, email, password, passwordVerify} = req.body

    const validation = cadastroSchema.validate(req.body, {abortEarly: false})
    if (validation.error){
        const erros = validation.error.details.map(e => e.message)
        return res.status(422).send(erros)
    }
    if (password !== passwordVerify) {return res.status(422).send("senhas devem ser iguais")}

    const passwordHash = bcrypt.hashSync(password, 10);

    db.collection('users').insertOne({
        name,
        email,
        passwordHash
    })

    res.sendStatus(201)
}

async function GetCadastros (req, res){
    const arr = await db.collection('movimentacoes').find().toArray()
    // arr.map((a) => {
    //     db.collection('users').deleteOne({ _id: a._id})
    // })
    res.send(arr)
}

export {NovoCadastro, GetCadastros} 