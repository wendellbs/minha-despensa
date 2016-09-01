angular.module('app', [])
  .controller('ListCtrl', function() {
    var ctrl = this

    today = moment().locale('pt')

    ctrl.listProduct = [
      {
        quantity: 8,
        name: 'Banana',
        purchaseDate: moment().locale('pt').subtract(8, 'days'),
        expectedDuration: 14,
      },
      {
        quantity: 5,
        name: 'Pão',
        purchaseDate: moment().locale('pt').subtract(8, 'days'),
        expectedDuration: 7,
      },
      {
        quantity: 6,
        name: 'Presunto',
        purchaseDate: moment().locale('pt').subtract(1, 'days'),
        expectedDuration: 4,
      },
      {
        quantity: 10,
        name: 'Queijo',
        purchaseDate: moment().locale('pt').subtract(1, 'days'),
        expectedDuration: 5,
      },
      {
        quantity: 10,
        name: 'Maçã',
        purchaseDate: moment().locale('pt').subtract(1, 'days'),
        expectedDuration: 20,
      },
    ]

    var isFresh = function(p) {
      var diffInDays = today.diff(p.purchaseDate, 'days') + 1
      console.log('diff', diffInDays, p.expectedDuration)
      return diffInDays < p.expectedDuration
    }

    ctrl.getListExpiringProduct = function() {
      return ctrl.listProduct.filter(function(p) {
        return !isFresh(p)
      })
    }

    ctrl.getListFreshProduct = function() {
      return ctrl.listProduct.filter(function(p) {
        return isFresh(p)
      })
    }
  })
