(function () {
  'use strict';

  angular
    .module('App')
    .controller('MapController', MapController);

  MapController.$inject = ['$scope', 'YelpService', '$ionicPlatform', '$state', '$ionicHistory', 'Occurrences', 'FirebaseData', '$firebaseArray'];
  function MapController($scope, YelpService, $ionicPlatform, $state, $ionicHistory, Occurrences, FirebaseData, $firebaseArrray) {

    console.log('MapController::');
    $scope.teste = $firebaseArrray(FirebaseData.refOccurrences);
    
    
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

    $scope.showCafeDetail = function (event, cafe){
      $scope.yelp.cafe = cafe;
      $scope.map.showInfoWindow.apply(this, [event, 'marker-info']);
    };


    $scope.occurrences = [
      {
        $id: '-KwIrfAMMs_5N-IFwL7D',
        description: 'aqui',
        location: {
          lat: 12.1,
          lng: 13
        },
        timestamp: 1507920321000,
        title: 'Tiroteio'
      },
      {
        $id: '-KwIri87PzGQVPgwzvCK',
        description: 'socorro',
        location: {
          lat: 12.1,
          lng: 13
        },
        timestamp: 1506920321000,
        title: 'Assalto'
      },
      {
        $id: '-KwIs4147t50HUikM6TT',
        description: 'aqui',
        location: {
          lat: 12.1,
          lng: 13
        },
        timestamp: 1507500321000,
        title: 'Furto'
      },
      {
        $id: '-KwpkB2IUOO-PmfeDj_Y',
        datetimeOcr : 1508435280,
        description: 'Melo - R$30,00',
        location: {
          lat: -22.955961,
          lng: -43.16622419999999
        },
        timestamp: 1508435345804,
        title: 'Furto'
      },
    ];

    setTimeout(function() {
      console.log("Ocorrencias", $scope.yelp.results);
    },3000);

  }
})();
