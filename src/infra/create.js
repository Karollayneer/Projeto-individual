import sqlite3 from 'sqlite3';
const db = new sqlite3.Database('./database.db');

const PRODUTO_SCHEMA = `
CREATE TABLE IF NOT EXISTS "Produto" (
    "ID" INTEGER PRIMARY KEY AUTOINCREMENT,
    "nome" varchar(64),
    "descrição" varchar(64),
    "data_de_fabricação" DATETIME
);`;

function criarTabelaProduto() {
  db.run(PRODUTO_SCHEMA, (error) => {
    if (error) {
      console.log("Erro ao criar tabela de Produto: ", error.message);
    } else {
      console.log("Tabela Produto criada com sucesso.");
    }
  });
}

criarTabelaProduto();

