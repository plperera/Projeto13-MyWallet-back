import joi from 'joi';

const cadastroSchema = joi.object({
    name:joi.string().required(),
    email:joi.string().required(),
    password:joi.string().required(),
    passwordVerify:joi.string().required(),
})

function NovoCadastro(req, res){
    const validation = cadastroSchema.validate(req.body, {abortEarly: false})
    if (validation.error){
        const erros = validation.error.details.map(e => e.message)
        return res.status(422).send(erros)
    }
    res.send("chegou aqui")
}

export {NovoCadastro} 