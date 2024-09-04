var express = require('express');
var router = express.Router();
const sql = require('../models/cadastro.model')

//Adicionar o cadastro
router.post('/add',(req,res)=>{
  //QUarda as informações em uma variável para facilitar o acesso
  let dados = req.body.info;
  
  sql.addCadastro(
    dados.apelido,
    dados.num_linha,
    dados.num_coluna
  ).then((resposta)=>{
    if(resposta instanceof Error ){
      res.status(500).json(resposta);
      return;
    }
    res.status(201).json(resposta);
  })
})

//Rota para buscar todos os cadastros
router.get('/buscaTodos',(req,res)=>{
  sql.getCadastros().then((resposta)=>{
    if(resposta instanceof Error){
      res.status(500).json(resposta);
      return;
    }
    res.status(200).json(resposta);
  })
})


module.exports = router;
