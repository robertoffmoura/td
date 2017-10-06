(function () {
  'use strict';

  angular
    .module('App')
    .controller('OcorrenciasController', OcorrenciasController);

  OcorrenciasController.$inject = ['$scope', '$ionicPlatform', '$state', '$ionicHistory'];
  function OcorrenciasController($scope, $ionicPlatform, $state, $ionicHistory) {

    console.log('OcorrenciasController::');

    // Altera o comportamento do backButton
    $ionicPlatform.registerBackButtonAction(function () {
      var currentState = $state.current.name;
      console.log('BackButton pressed on state:', currentState);

      if (currentState === 'tabs.mapa') {
        $ionicHistory.nextViewOptions({
          disableBack: true,
          disableAnimate: true,
          historyRoot: true
        });
        $state.go('home');
      }
    }, 100);


  }
})();
