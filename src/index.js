import express from 'express';
import cors from 'cors';
import {} from 'mongodb'

import dayjs from 'dayjs';
import db from './database/db.js'

import { BuscarMovimentacao, NovaMovimentacao } from './controllers/movimentacao.js';
import { NovoCadastro } from './controllers/cadastro.js';
import { NovoLogin } from './controllers/login.js';
const server = express()

server.use(cors())
server.use(express.json())

server.get('/historico/:user', BuscarMovimentacao)
server.post('/historico', NovaMovimentacao)

server.post('/cadastro', NovoCadastro)

server.post('/login', NovoLogin)

server.listen(5000, () => console.log("salve console"))