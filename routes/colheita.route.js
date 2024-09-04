var express = require('express');
var router = express.Router();
const sql = require('../models/colheita.model')

//Adicionar a colheita 
router.post('/add',(req,res)=>{
  //Quarda as informações em uma variável para facilitar o acesso
  let dados = req.body.info;
  
  sql.addColheita(
    dados.quantidade,
    dados.dt_colheita,
    dados.arvore,
    dados.defensivo,
    dados.fertilizantes
  ).then((resposta)=>{
    if(resposta instanceof Error ){
      res.status(500).json(resposta);
      return;
    }
    res.status(201).json(resposta);
  })
})

//Rota para buscar todos os materiais
router.get('/buscaTodos',(req,res)=>{
  sql.getColheitas().then((resposta)=>{
    if(resposta instanceof Error){
      res.status(500).json(resposta);
      return;
    }
    res.status(200).json(resposta);
  })
})


module.exports = router;
