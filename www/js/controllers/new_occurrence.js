(function () {
  'use strict';

  angular
    .module('App')
    .controller('NewOccurrenceController', NewOccurrenceController);

  NewOccurrenceController.$inject = ['$scope', '$ionicPlatform', '$state', '$ionicHistory', '$ionicViewSwitcher'];

  function NewOccurrenceController($scope, $ionicPlatform, $state, $ionicHistory, $ionicViewSwitcher) {

    console.log('NewOccurrenceController::');

    $scope.goBack = function () {
      $ionicViewSwitcher.nextDirection('back');
      $ionicHistory.nextViewOptions({
        disableBack: true,
        disableAnimate: true,
        historyRoot: true
      });
      $state.go('tabs.occurrences');
    };


    $scope.onAddressSelection = function (location) {
      console.log(location);
      console.log('name:', location.name);
      console.log('icon:', location.icon);
      console.log('lat:', location.geometry.location.lat());
      console.log('lng:', location.geometry.location.lng());
      console.log('vicinity:', location.vicinity);
      if (location.photos !== undefined)
        console.log('photo Url:', location.photos[0].getUrl({'maxWidth': 100, 'maxHeight': 100}));


    };


  }
})();
