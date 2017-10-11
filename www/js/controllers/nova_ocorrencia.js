(function () {
  'use strict';

  angular
    .module('App')
    .controller('NovaOcorrenciaController', NovaOcorrenciaController);

  NovaOcorrenciaController.$inject = ['$scope', '$ionicPlatform', '$state', '$ionicHistory', '$ionicViewSwitcher'];
  function NovaOcorrenciaController($scope, $ionicPlatform, $state, $ionicHistory, $ionicViewSwitcher) {

    console.log('NovaOcorrenciaController::');

    $scope.goBack = function () {
      $ionicViewSwitcher.nextDirection('back');
      $ionicHistory.nextViewOptions({
        disableBack: true,
        disableAnimate: true,
        historyRoot: true
      });
      $state.go('tabs.ocorrencias');
    }


  }
})();
