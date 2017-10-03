(function () {
  'use strict';

  angular
    .module('App')
    .controller('OcorrenciasController', OcorrenciasController);

  OcorrenciasController.$inject = ['$scope'];
  function OcorrenciasController($scope) {

    console.log('OcorrenciasController::');


  }
})();
