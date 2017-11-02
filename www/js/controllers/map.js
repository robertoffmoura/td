(function () {
  'use strict';

  angular
    .module('App')
    .controller('MapController', MapController);

  MapController.$inject = ['$scope', 'YelpService', 'Occurrences'];
  function MapController($scope, YelpService, Occurrences) {

    console.log('MapController::');

    $scope.$on('mapInitialized', function (event, map) {
      $scope.map = map;
    });

    $scope.yelp = YelpService;

    $scope.showOcrDetail = function(event, ocr) {
      console.log("Exibindo informações", ocr);
      $scope.yelp.ocr = ocr;
      $scope.map.showInfoWindow.apply(this, [event, 'marker-info']);
    };

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

    setTimeout(function() {
      console.log("Ocorrencias", $scope.yelp.results);
    },3000);

  }
})();
