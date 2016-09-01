angular.module('app', [])
  .controller('ListCtrl', function() {
    var ctrl = this
    ctrl.listProduct = [
      {
        quantity: 10,
        name: 'Quejo',
        purchaseDate: new Date(),
        expectedDuration: 5,
      },
      {
        quantity: 5,
        name: 'Pão',
        purchaseDate: new Date(),
        expectedDuration: 7,
      }
    ]
  })
