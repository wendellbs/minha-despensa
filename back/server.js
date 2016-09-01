var express = require('express');
var app = express();
var listProduct = require('./listProduct')

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
    console.log(p, id)
    return p.id !== id
  })
  res.send('')
});

var port = 5000

app.listen(port, function () {
  console.log('Example app listening on port ' + port);
});
