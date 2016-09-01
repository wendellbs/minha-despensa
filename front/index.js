var listRecipe = [
  {
    id: 3,
    img: 'tabuafrios.jpg',
    title: 'Tábua de Frios',
    text: 'Corte os queijos em cubos pequenos. Em uma tábua, faça a disposição das fatias de salame e do pão. Pegue porções de diferentes tipos de queijos e azeitonas e disponha-os de forma que a tábua fique dividida em fatias.',
  },
  {
    id: 1,
    img: 'frangoxadrez.jpg',
    title: 'Frango à Xadrez',
    text: 'Em uma frigideira misture azeite de oliva a cebola e deixe fritar. Retire e coloque em um prato. Na mesma panela, coloque o sal, o restante do azeite e frite os pimentões por 5 minutos. Retire e despeje em outro prato. Ainda na mesma panela, coloque o frango e frite até dourar. Coloque todos os ingredientes novamente na frigideira, misture bem com uma colher de pau e refogue por mais 2 minutos. Em uma xícara, misture o molho shoyu, a maisena e a água. Mexa bem e junte a mistura de frango. Cozinhe, mexendo constantemente, até formar um molho espesso. Coloque em uma travessa, polvilhe com amendoim e sirva quente.',
  },
  {
    id: 2,
    img: 'sucos.jpg',
    title: 'Suco de Frutas',
    text: 'Espremer as laranjas. Passar o suco na peneirinha. Descascar a banana e a maçã. Bater no liquidificador a banana e a maçã com a água, o suco de laranja e o açúcar. Se preferir bem gelado acrescente gelo à vontade.',
  },
]

var listProduct = []

today = moment().locale('pt')

angular.module('app', [])
  .controller('ListCtrl', function(productService) {
    var ctrl = this

    productService.all()
      .then(d => {
        listProduct = d
      })

    ctrl.currentRecipe = listRecipe[0]

    ctrl.daysSincePurchase = function(product) {
      return today.diff(product.purchaseDate, 'days')
    }

    ctrl.daysSincePurchaseFormatted = function(product) {
      var days = ctrl.daysSincePurchase(product)
      var message = 'Comprado há ' + days + ' dia'
      if (days !== 1) {
        message += 's'
      }
      return message
    }

    ctrl.isFresh = function(product) {
      return ctrl.daysSincePurchase(product) < product.expectedDuration
    }

    ctrl.getListExpiringProduct = function() {
      return listProduct.filter(function(p) {
        return !ctrl.isFresh(p)
      })
    }

    ctrl.getListFreshProduct = function() {
      return listProduct.filter(function(p) {
        return ctrl.isFresh(p)
      })
    }

    ctrl.getRecipeUrl = function() {
      return './assets/images/recipe/' + ctrl.currentRecipe.img
    }

    ctrl.remove = function(product) {
      productService.remove(product.id)
        .then(function() {
          var index = listProduct.indexOf(product)
          listProduct.splice(index, 1)
        })
    }

    ctrl.recipe = function(product) {
      ctrl.currentRecipe = listRecipe.find(function(r) {
        return r.id === product.recipeId
      })
      $('body').animate({scrollTop:0}, '500');
    }
  })
  .service('productService', function($http) {

    return {
      all: function() {
        return $http.get('http://127.0.0.1:5000/product')
          .then(response => {
            var data = response.data

            data.forEach(function(p) {
              p.purchaseDate = moment(p.purchaseDate)
            })

            return data
          })
      },
      remove: function(id) {
        return $http.get('http://127.0.0.1:5000/remove/' + id)
      }
    }
  })
