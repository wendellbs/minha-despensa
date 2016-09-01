var express = require('express');
var app = express();
var listProductOriginal = require('./listProduct')

var listProduct

var resetListProduct = function() {
  listProduct = listProductOriginal.map(function(p) {
    return p
  })
}


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/product', function(req, res) {
  res.send(listProduct);
});

app.get('/remove/:id', function(req, res) {
  var id = parseInt(req.params.id)
  listProduct = listProduct.filter(function(p) {
    return p.id !== id
  })

  if (listProduct.length === 0) {
    resetListProduct()
  }
  res.send('')
});

var port = 5000

resetListProduct()

app.listen(port, function () {
  console.log('Example app listening on port ' + port);
});
