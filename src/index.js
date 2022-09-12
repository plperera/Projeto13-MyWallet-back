import express from 'express';
import cors from 'cors';
import db from './database/db.js';

import { HistoricoMovimentacao, NovaMovimentacao } from './controllers/movimentacao.js';
import { NovoCadastro, GetCadastros } from './controllers/cadastro.js';
import { NovoLogin } from './controllers/login.js';
import { setIntervalSessionsDelete } from './utils/setIntervalSessions.js';

const server = express()

server.use(cors())
server.use(express.json())

server.post('/cadastro', NovoCadastro)
server.get('/cadastro', GetCadastros)

server.post('/login', NovoLogin)

server.get('/historico', HistoricoMovimentacao)
server.post('/historico', NovaMovimentacao)


setInterval( async function(){

    setIntervalSessionsDelete()

}, 15000)

server.listen(5000, () => console.log("salve console"))