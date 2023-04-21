const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');

const PRODUTO_SCHEMA = `
CREATE TABLE IF NOT EXISTS "Produto" (
    "ID" INTEGER PRIMARY KEY AUTOINCREMENT,
    "nome" varchar(64),
    "descrição" varchar(64),
    "data_de_fabricação" DATETIME(64)
);`;

function criarTabelaProduto () {
    db.run(PRODUTO_SCHEMA, (error) => {
        if (error) console.log("erro ao criar tabela de Produto");
    });
}

db.serialize( () => {
    criarTabelaProduto();
});