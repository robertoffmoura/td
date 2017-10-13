(function () {
  'use strict';

  angular
    .module('App')
    .controller('OccurrencesController', OccurrencesController);

  OccurrencesController.$inject = ['$scope', 'Occurrences', '$state', '$ionicHistory', '$ionicViewSwitcher'];
  function OccurrencesController($scope, Occurrences, $state, $ionicHistory, $ionicViewSwitcher) {

    console.log('OccurrencesController::');

    $scope.occurrences = Occurrences;

    $scope.occurrences.loadOccurrences().then(function () {
      console.log('Occurrences loaded');
    });


  }
})();
