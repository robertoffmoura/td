(function () {
  'use strict';

  angular
    .module('App')
    .controller('OcorrenciasController', OcorrenciasController);

  OcorrenciasController.$inject = ['$scope', '$ionicPlatform', '$state', '$ionicHistory', '$ionicViewSwitcher'];
  function OcorrenciasController($scope, $ionicPlatform, $state, $ionicHistory, $ionicViewSwitcher) {

    console.log('OcorrenciasController::');



  }
})();
