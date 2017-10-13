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
    };



    $scope.data = {};

    $scope.countryCode = 'BR';

    $scope.onAddressSelection = function (location) {
      console.log(location);
      console.log($scope.data);

      var a = location.address_components;
    };



  }
})();
