import joi from 'joi';

const loginSchema = joi.object({
    email:joi.string().required(),
    password:joi.string().required(),
})

function NovoLogin(req, res){

    const validation = loginSchema.validate(req.body, {abortEarly: false})
    if (validation.error){
        const erros = validation.error.details.map(e => e.message)
        return res.status(422).send(erros)
    }
    res.send("login feito com sucesso")
}

export {NovoLogin}