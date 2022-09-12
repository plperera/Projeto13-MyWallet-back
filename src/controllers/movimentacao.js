import joi from 'joi';

const movimentacaoSchema = joi.object({
    valor:joi.number().required(),
    descricao:joi.string().min(4).max(25).required(),
})

function HistoricoMovimentacao(req, res){

    const {user} = req.params
    console.log(user)
    res.send(arr.filter((e)=>e.user === user))
}

function NovaMovimentacao(req, res) {

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

}

export {HistoricoMovimentacao, NovaMovimentacao}