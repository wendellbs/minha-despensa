angular.module('app', [])
  .controller('ListCtrl', function() {
    var ctrl = this
    ctrl.listProduct = [
      {
        name: 'Quejo',
        purchaseDate: new Date(),
        expectedDuration: 5,
      },
      {
        name: 'Pão',
        purchaseDate: new Date()
        expectedDuration: 7,
      }
    ]
  })
