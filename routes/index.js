var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', async function(req, res) {
  const registros = await global.db.listProdutos()
  res.render('index', { registros });
});

router.get('/insertProduto', function(req, res){

  res.render('formProd', {action:'/insertProduto'})

});

router.post('/insertProduto', async function(req, res){

  const name = req.body.newProd
  const preco = parseInt(req.body.newPreco)
  const qtd = parseInt(req.body.newQtd)

  await global.db.insertProduto({name, preco, qtd})
  res.redirect('/')

});

router.get('/deleteProduto/:id', async function(req, res){

  const codigo = parseInt(req.params.id)
  await global.db.deleteProduto(codigo)
  res.redirect('/')

});

module.exports = router;
