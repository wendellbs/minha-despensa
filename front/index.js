var listRecipe = [
  {
    id: 1,
    img: 'frangoxadrez.jpg',
  },
  {
    id: 2,
    img: 'sucos.jpg',
  },
  {
    id: 3,
    img: 'tabuafrios.jpg',
  },
]

var listProduct = [
  {
    id: 1,
    quantity: 5,
    name: 'Pão',
    purchaseDate: moment().locale('pt').subtract(8, 'days'),
    expectedDuration: 7,
    img: 'pao.jpg',
    recipeId: 3,
  },
  {
    id: 2,
    quantity: 5,
    name: 'Cebola',
    purchaseDate: moment().locale('pt').subtract(8, 'days'),
    expectedDuration: 7,
    img: 'cebola.jpg',
    recipeId: 1,
  },
  {
    id: 3,
    quantity: 5,
    name: 'Pimentão',
    purchaseDate: moment().locale('pt').subtract(8, 'days'),
    expectedDuration: 7,
    img: 'pimentao.jpg',
    recipeId: 1,
  },
  {
    id: 4,
    quantity: 5,
    name: 'Laranja',
    purchaseDate: moment().locale('pt').subtract(8, 'days'),
    expectedDuration: 7,
    img: 'laranja.jpg',
    recipeId: 2,
  },
  {
    id: 5,
    quantity: 5,
    name: 'Frango',
    purchaseDate: moment().locale('pt').subtract(8, 'days'),
    expectedDuration: 7,
    img: 'frango.jpg',
    recipeId: 1,
  },
  {
    id: 6,
    quantity: 8,
    name: 'Banana',
    purchaseDate: moment().locale('pt').subtract(8, 'days'),
    expectedDuration: 14,
    img: 'banana.jpg',
    recipeId: 2,
  },
  {
    id: 7,
    quantity: 6,
    name: 'Salame',
    purchaseDate: moment().locale('pt').subtract(1, 'days'),
    expectedDuration: 4,
    img: 'salame.jpg',
    recipeId: 3,
  },
  {
    id: 8,
    quantity: 10,
    name: 'Queijo',
    purchaseDate: moment().locale('pt').subtract(1, 'days'),
    expectedDuration: 5,
    img: 'queijo.jpg',
    recipeId: 3,
  },
  {
    id: 9,
    quantity: 10,
    name: 'Maçã',
    purchaseDate: moment().locale('pt').subtract(1, 'days'),
    expectedDuration: 20,
    img: 'maca.jpg',
    recipeId: 2,
  },
  {
    id: 10,
    quantity: 10,
    name: 'Azeitona',
    purchaseDate: moment().locale('pt').subtract(1, 'days'),
    expectedDuration: 20,
    img: 'azeitona.jpg',
    recipeId: 3,
  },
]

today = moment().locale('pt')

angular.module('app', [])
  .controller('ListCtrl', function() {
    var ctrl = this

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
      var index = listProduct.indexOf(product)
      listProduct.splice(index, 1)
    }

    ctrl.recipe = function(product) {
      ctrl.currentRecipe = listRecipe.find(function(r) {
        return r.id === product.recipeId
      })
      // $( "body" ).scrollTop( 1 );
      $("body").animate({scrollTop:0}, '500');
      // window.scrollTo(0, 0);
      // console.log('currentRecipe', ctrl.currentRecipe)
    }
  })
