// Importa o db.js para poder usar o banco de dados simulado
import db from "../infra/db.js" ;



// Essa classe encapsula o acesso ao Banco de Dados. Todos os métodos abaixos são estáticos. Isso quer dizer que não precisamos instanciar a classe para usá-los e serão chamados pela classe produtoController... Alguns vão dar retorno e para outros, isso não será necessário
class ProdutoDAO {

  // GET  --  Função ALL - Retorna todas as linhas. No callback existe o argumento ROWS
  static listar() {
    const query = "SELECT * FROM produto";
    return new Promise((resolve, reject) => {
      db.all(query, (err, rows) => {
        if (err) {
          reject(err);
        }
        resolve(rows);
      });
    });
  }

  // GET  --  
  static buscarPorID(id) {
    const query = "SELECT * FROM produto WHERE id = ?";
    return new Promise((resolve, reject) => {
      db.get(query, [id], (err, row) => {
        if (err) {
          reject(false);
        }
        resolve(row);
      });
    });
  }

  // POST
  static inserir(produto) {
    const query = "INSERT INTO produto (nome, descrição, data_de_fabricação) VALUES( ?, ?, ?)";
    return new Promise((resolve, reject) => {
      db.run(query, [produto.nome, produto.descrição,  produto.data_de_fabricação], (err) => {
        if (err) {
          reject({
            mensagem: "Erro ao inserir o produto",
            error: err,
          });
        }
        resolve(produto);
      });
    });
  }

  // PUT  --  
  static atualizar(id, produto) {
    const query =
      "UPDATE produto SET nome = ?, descrição = ?, data_de_fabricação = ? WHERE id = ?";
    return new Promise((resolve, reject) => {
      db.run(
        query,
        [produto.nome, produto.descrição, produto, produto.data_de_fabricação, id],
        (err) => {
          if (err) {
            reject({
              mensagem: "Erro ao atualizar o produto",
              erro: err,
            });
          }
          resolve({
            mensagem: "Produto atualizado com sucesso"
          });
        }
      );
    });
  }


  // DELETE  --  
  static deletar(id) {
    const query = "DELETE FROM produto WHERE id = ?";
    return new Promise((resolve, reject) => {
      db.run(query, [id], (err) => {
        if (err) {
          reject({
            mensagem: "Erro ao deletar o produto",
            erro: err,
          });
        }
        resolve({ mensagem: "produto deletado com sucesso", id: id });
      });
    });
  }
}


// Exporta a classe
export default ProdutoDAO;