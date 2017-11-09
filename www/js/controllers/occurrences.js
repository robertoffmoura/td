(function () {
  'use strict';

  angular
    .module('App')
    .controller('OccurrencesController', OccurrencesController);

  OccurrencesController.$inject = ['$scope', 'Occurrences', '$state', '$ionicHistory', '$ionicViewSwitcher', '$rootScope', 'Utils'];
  function OccurrencesController($scope, Occurrences, $state, $ionicHistory, $ionicViewSwitcher, $rootScope, Utils) {

    console.log('OccurrencesController::');

    $scope.occurrences = Occurrences;

    Utils.showLoading();

    $scope.occurrences.loadOccurrences().then(function () {
      console.log('Occurrences loaded', $scope.occurrences.list);
    });

    $scope.showInMap = function (ocr) {
      // $rootScope.lat = ocr.location.lat;
      // $rootScope.lon = ocr.location.lng;
      $rootScope.ocrSelected = ocr;
      $ionicViewSwitcher.nextDirection('back');
      $ionicHistory.nextViewOptions({
        disableBack: true,
        disableAnimate: true,
        historyRoot: true
      });
      $state.go('tabs.map');
    };

  }
})();
