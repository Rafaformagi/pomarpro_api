var express = require('express');
var router = express.Router();
const sql = require('../models/home.model')


//Rota para buscar todos os materiais
router.get('/buscarTodos',(req,res)=>{
  sql.getHomes().then((resposta)=>{
    if(resposta instanceof Error){
      res.status(500).json(resposta);
      return;
    }
    res.status(200).json(resposta);
  })
})

//Adicionar o usuário 
router.post('/add',(req,res)=>{
  //QUarda as informações em uma variável para facilitar o acesso
  let dados = req.body.info;
  
  sql.addHome(
    dados.descricao,
    dados.tipo,
    dados.quantidade
  ).then((resposta)=>{
    if(resposta instanceof Error ){
      res.status(500).json(resposta);
      return;
    }
    res.status(201).json(resposta);
  })
})

module.exports = router;
