// Importando o packages
const express = require('express')
const cors = require('cors')

// instanciando o servidor
const app = express()

// configurando o servidor para receber requisições com o corpo no formato JSON
app.use(express.json());
app.use(cors())

// importando os controllers

const ProdutoController = require('./controllers/produto-controller.js');

ProdutoController.rotas(app)

module.exports = app
