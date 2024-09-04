const conexao = require('../database/connection.database');

//Busca todos os movimentos do bando de dados

async function getMovimentos (){
    try{
        const [linhas] = await conexao.query(`
            select * from tb_movimentacao
            `)
            return linhas;
    }catch(erro){
        return erro;
    }
}

//Insere o movimento no banco de dados
async function addMovimento(
tipo
){
    try{
        const [exec] = await conexao.query(`
            insert into tb_movimentacao (
            dt_movimneto, tipo
            ) values(
             current_timestamp,?
             )
            `,[tipo])

            const [linhas] = await conexao.query(`
                select last_insert_id() as id;
                `)

    return linhas[0];  
    }catch(erro){
        return erro;
    }
}

async function addItem(
    produto,quantidade,movimento
    ){
        try{
            const [exec] = await conexao.query(`
                insert into tb_mov_iten (
                tb_movimentacao_id,tb_produtos_id,quantidade
                ) values(
                 ?,?,?
                 )
                `,[movimento,produto,quantidade])


                return exec.affectedRows;  
            }catch(erro){
                return erro;
            }
    }


//Busca os usuários pelo ID

async function getMovimentoById (id){
    try{
        const [linhas] = await conexao.query(`
            select * from tb_movimentacao where id = ?
            `,[id])
            return linhas;
    }catch(erro){
        return erro;
    }
  }

module.exports = { 
    getMovimentos,
    getMovimentoById,
    addMovimento,
    addItem
};