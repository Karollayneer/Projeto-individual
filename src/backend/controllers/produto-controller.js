import ProdutoDAO from '../DAO/ProdutoDAO.js'
import Produto from '../models/Produto.js'


class ProdutoController {
    static rotas(app) {
        app.get('/Produto', ProdutoController.listar)
        app.get('/Produto/id/:id', ProdutoController.buscarPorID)
        app.post('/Produto', ProdutoController.inserir)
        app.put('/Produto/id/:id', ProdutoController.atualizaProduto)
        app.delete('/Produto/id/:id', ProdutoController.deletarProduto)
    }

    
    // GET para listar todos
    static async listar(req, res) {
        const produto = await ProdutoDAO.listar()
        res.status(200).send(produto)
    }


    // GET para buscar apenas 1 pela ID
    static async buscarPorID(req, res) {
        const produto = await ProdutoDAO.buscarPorID(req.params.id)
        if (!produto) {
            res.status(404).send("Produto não encontrado")
            return
        }
        res.status(200).send(produto)
    }



    // POST - Adicionar 1 produto
    static async inserir(req, res) {
        const produto = new Produto(
            req.body.nome,
            req.body.descrição,
            req.body.data_de_fabricação
        )
        if (!produto.nome || !produto.descrição || !produto.data_de_fabricação) {
            res.status(400).send("Precisa passar todas as informações")
            return
        }
        const result = await ProdutoDAO.inserir(produto)
        if (result.erro) {
            res.status(500).send(result)
            return
        }
        res.status(201).send({ "Mensagem": "Produto criado com sucesso", "Novo Produto: ": produto })
    }


    // PUT - Editar um produto
    static async atualizaProduto(req, res) {
        try {const produto = new Produto(
            req.body.nome,
            req.body.descrição,
            req.body.data_de_fabricação
            
        )
        if (!produto || !produto.nome || !produto.descrição || !produto.data_de_fabricação) {
            res.status(400).send("Precisa passar todas as informações")
            return
        }
        if (!Object.keys(produto).length) {
            res.status(400).send('O objeto está sem chave')
            return
        }
        const result = await ProdutoDAO.atualizar(req.params.id, produto)
        if (result.erro) {
            res.status(500).send('Erro ao atualizar o produto')
            return
        }
        res.status(200).send({ "Mensagem": "Dados atualizados", "produto: ": produto })
    } catch (err) {
        console.log(err)
        res.status(500).send('Erro ao atualizar o produto')
    }}


    // DELETE - Deletar 1 produto
    static async deletarProduto(req, res) {
        const produto = await ProdutoDAO.buscarPorID(req.params.id)
        if (!produto) {
            res.status(404).send("Produto não encontrado")
            return
        }
        const result = await ProdutoDAO.deletar(req.params.id)
        if (result.erro) {
            res.status(400).send({ 'Mensagem': 'Produto não deletado' })
            return
        }
        res.status(200).send(result)
    }
}

export default ProdutoController

