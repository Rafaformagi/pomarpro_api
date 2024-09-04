var express = require('express');
var router = express.Router();
const sql = require('../models/movimento.model')

//Adicionar o movimento
router.post('/add',(req,res)=>{
  //QUarda as informações em uma variável para facilitar o acesso
  let dados = req.body.info;
  
  sql.addMovimento(
    dados.tipo,
  ).then((resposta)=>{
    console.log(resposta)
    if(resposta instanceof Error ){
      res.status(500).json(resposta);
      return;
    }
    sql.addItem(dados.tb_produtos_id,dados.quantidade,resposta.id).then((resposta2)=>{
      console.log(resposta2)
      if(resposta2 instanceof Error){
      res.status(500).json(resposta2);
      return;
    }
    res.status(201).json(resposta2);
  })
  })
    
  })

//Rota para buscar todos os movimentos
router.get('/buscaTodos',(req,res)=>{
  sql.getMovimentos().then((resposta)=>{
    if(resposta instanceof Error){
      res.status(500).json(resposta);
      return;
    }
    res.status(200).json(resposta);
  })
})


module.exports = router;
