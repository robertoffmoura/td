(function () {
  'use strict';

  angular
    .module('App')
    .controller('SobreController', SobreController);

  SobreController.$inject = ['$scope'];
  function SobreController($scope) {

    console.log('SobreController::');

  }
})();
