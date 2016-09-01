var listProduct = [
  {
    quantity: 5,
    name: 'Pão',
    purchaseDate: moment().locale('pt').subtract(8, 'days'),
    expectedDuration: 7,
    img: 'pao.jpg',
  },
  {
    quantity: 5,
    name: 'Cebola',
    purchaseDate: moment().locale('pt').subtract(8, 'days'),
    expectedDuration: 7,
    img: 'cebola.jpg',
  },
  {
    quantity: 5,
    name: 'Pimentão',
    purchaseDate: moment().locale('pt').subtract(8, 'days'),
    expectedDuration: 7,
    img: 'pimentao.jpg',
  },
  {
    quantity: 5,
    name: 'Laranja',
    purchaseDate: moment().locale('pt').subtract(8, 'days'),
    expectedDuration: 7,
    img: 'laranja.jpg',
  },
  {
    quantity: 5,
    name: 'Frango',
    purchaseDate: moment().locale('pt').subtract(8, 'days'),
    expectedDuration: 7,
    img: 'frango.jpg',
  },
  {
    quantity: 8,
    name: 'Banana',
    purchaseDate: moment().locale('pt').subtract(8, 'days'),
    expectedDuration: 14,
    img: 'banana.jpg',
  },
  {
    quantity: 6,
    name: 'Presunto',
    purchaseDate: moment().locale('pt').subtract(1, 'days'),
    expectedDuration: 4,
    img: 'presunto.jpg',
  },
  {
    quantity: 10,
    name: 'Queijo',
    purchaseDate: moment().locale('pt').subtract(1, 'days'),
    expectedDuration: 5,
    img: 'queijo.jpg',
  },
  {
    quantity: 10,
    name: 'Maçã',
    purchaseDate: moment().locale('pt').subtract(1, 'days'),
    expectedDuration: 20,
    img: 'maca.jpg',
  },
]

angular.module('app', [])
  .controller('ListCtrl', function() {
    var ctrl = this

    today = moment().locale('pt')

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

    ctrl.remove = function(product) {
      var index = listProduct.indexOf(product)
      listProduct.splice(index, 1)
    }

    ctrl.recipe = function(product) {
      console.log('product', product)
    }
  })
