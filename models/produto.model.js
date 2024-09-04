const conexao = require('../database/connection.database');

//Busca todos os materiais do bando de dados

async function getProdutos (){
    try{
        const [linhas] = await conexao.query(`
            select * from tb_produto
            `)
            return linhas;
    }catch(erro){
        return erro;
    }
}

//Insere um usuário no banco de dados
async function addProduto(descricao,unidemedida,valor,tipo){
    try{
        const [exec] = await conexao.query(`
            insert into tb_produto(
            descricao, unid_medida, valor,tipo
            ) values(
             ?,?,?,?
             )
            `,[descricao,unidemedida,valor,tipo])
            return exec.affectedRows;
    }catch(erro){
        return erro;
    }
}


//Busca os prodtos pelo ID

async function getProdutoById (id){
    try{
        const [linhas] = await conexao.query(`
            select * from tb_produto where id = ?
            `,[id])
            return linhas;
    }catch(erro){
        return erro;
    }
  }

module.exports = { 
    getProdutos,
    getProdutoById,
    addProduto
};