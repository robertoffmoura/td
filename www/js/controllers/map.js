(function () {
  'use strict';

  angular
    .module('App')
    .controller('MapController', MapController);

  MapController.$inject = ['$scope', 'YelpService', '$timeout', '$state', '$rootScope', '$ionicPopup', 'Utils'];

  function MapController($scope, YelpService, $timeout, $state, $rootScope, $ionicPopup, Utils) {

    console.log('MapController::');

    $scope.yelp = YelpService;

    $rootScope.dataUser = {
      name: '',
      anonymous: false
    };
    Utils.getLocalStorage('dataUser')
      .then(function (value) {
        $rootScope.dataUser = value;
      })
      .catch(function () {
        $timeout(function () {
          $scope.showUserPopup();
        }, 3000);
      });

    $scope.$on('mapInitialized', function (event, map) {
      $scope.map = map;
    });

    $scope.$watch(function () {
      return $state.$current.name;
    }, function () {
      // Recarregar o mapa: resolve o mapa cinza
      google.maps.event.trigger($scope.map, 'resize');
      $scope.doRefresh();
    });

    $scope.showOcrDetail = function (event, ocr) {
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

    $scope.showUserPopup = function () {
      $ionicPopup.show({
        title: 'Configuração de Usuário',
        subTitle: 'Identifique-se, se desejar',
        scope: $rootScope,
        template: '<p>Digite seu nome:</p>' +
        '<input style="margin-bottom: 5px;" type="text" ng-model="dataUser.name" ng-disabled="dataUser.anonymous">' +
        '<label class="containerCustom">Continuar como anônimo  ' +
        '  <input type="checkbox" ng-model="dataUser.anonymous" style="width: auto">' +
        '  <span class="checkmarkCustom"></span>' +
        '</label>',
        // '</ion-list>',
        buttons: [
          {
            text: 'Cancelar',
            type: 'button-dark',
            onTap: function () {
              return 'Cancelar';
            }
          },
          {
            text: '<b>Salvar</b>',
            type: 'button-calm',
            onTap: function (e) {
              if ($rootScope.dataUser.name === '' && !$rootScope.dataUser.anonymous) {
                e.preventDefault();
              } else {
                if ($rootScope.dataUser.anonymous)
                  $rootScope.dataUser.name = 'Anônimo';
                Utils.setLocalStorage('dataUser', $rootScope.dataUser);
                return 'Salvar'
              }
            }
          }
        ]
      });
    };

    $timeout(function () {
      console.log("Ocorrencias", $scope.yelp.results);
    }, 3000);

  }
})();
