(function () {
  'use strict';

  angular
    .module('App')
    .controller('OccurrencesController', OccurrencesController);

  OccurrencesController.$inject = ['$scope', 'Occurrences', '$state', '$ionicHistory', '$ionicViewSwitcher', '$firebaseArray', 'FirebaseData', 'Utils'];
  function OccurrencesController($scope, Occurrences, $state, $ionicHistory, $ionicViewSwitcher, $firebaseArray, FirebaseData, Utils) {

    console.log('OccurrencesController::');

    $scope.occurrences = Occurrences;

    Utils.showLoading();

    $scope.occurrences.loadOccurrences().then(function () {
      console.log('Occurrences loaded');
    });

  }
})();
