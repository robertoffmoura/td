(function () {
  'use strict';

  angular
    .module('App')
    .controller('MapaController', MapaController);

  MapaController.$inject = ['$scope', 'YelpService', '$ionicPlatform', '$state', '$ionicHistory'];
  function MapaController($scope, YelpService, $ionicPlatform, $state, $ionicHistory) {

    console.log('MapaController::');

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


    $scope.$on('mapInitialized', function (event, map) {
      $scope.map = map;
    });

    $scope.yelp = YelpService;

    $scope.doRefresh = function () {
      if (!$scope.yelp.isLoading) {
        $scope.yelp.refresh().then(function () {
          $scope.$broadcast('scroll.refreshComplete');
        });
      }
    };

    $scope.loadMore = function () {
      console.log("loadMore");
      if (!$scope.yelp.isLoading && $scope.yelp.hasMore) {
        $scope.yelp.next().then(function () {
          $scope.$broadcast('scroll.infiniteScrollComplete');
        });
      }
    };

    $scope.getDirections = function (cafe) {
      console.log("Getting directions for cafe");
      var destination = [
        cafe.location.coordinate.latitude,
        cafe.location.coordinate.longitude
      ];

      var source = [
        $scope.yelp.lat,
        $scope.yelp.lon
      ];

      launchnavigator.navigate(destination, source);
    };

    $scope.showCafeDetail = function (event, cafe){
      $scope.yelp.cafe = cafe;
      $scope.map.showInfoWindow.apply(this, [event, 'marker-info']);
    };

  }
})();
