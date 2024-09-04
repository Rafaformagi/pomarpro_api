const conexao = require('../database/connection.database');

//Busca todos os materiais do bando de dados

async function getHomes (){
    try{
        const [linhas] = await conexao.query(`
            select
p.id,
p.descricao,
sum(if(t.id=6,mi.quantidade,0)) - sum(if(t.id=7,mi.quantidade,0)) as quantidade
from tb_movimentacao m
inner join tb_mov_iten mi on mi.tb_movimentacao_id = m.id
inner join tb_tipo t on t.id = m.tipo
inner join tb_produto p on p.id = mi.tb_produtos_id
where 1=1
and m.tipo in (7,6)
group by p.id;

            `)
            return linhas;
    }catch(erro){
        return erro;
    }
}

//Busca os prodtos pelo ID

async function getHomeById (id){
    try{
        const [linhas] = await conexao.query(`
            select * from tb_produto where id = ?
            `,[id])
            return linhas;
    }catch(erro){
        return erro;
    }
  }

  async function addHome(descricao,quantidade){
    try{
        const [exec] = await conexao.query(`
            insert into tb_produto(
            descricao,quantidade
            ) values(
             ?,?
             )
            `,[descricao,quantidade])
            return exec.affectedRows;
    }catch(erro){
        return erro;
    }
}



module.exports = { 
    getHomes,
    getHomeById,
    addHome
};