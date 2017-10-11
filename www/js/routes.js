angular
  .module('App')
  .config(['$stateProvider', '$urlRouterProvider', '$ionicConfigProvider',
    function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

      $ionicConfigProvider.navBar.alignTitle('center');

      $ionicConfigProvider.scrolling.jsScrolling(ionic.Platform.isIOS());

      $stateProvider
        .state('home', {
          url: '/home',
          templateUrl: 'templates/home.html',
          controller: 'HomeController'
        })
        .state('sobre', {
          url: '/sobre',
          templateUrl: 'templates/sobre.html',
          controller: 'SobreController'
        })
        .state('tabs', {
          url: '/tabs',
          abstract: true,
          templateUrl: 'templates/tabs.html',
          controller: 'TabsController'
        })
        .state('tabs.mapa', {
          url: '/mapa',
          views: {
            'tab-mapa': {
              templateUrl: 'templates/mapa.html',
              controller: 'MapaController'
            }
          }
        })
        .state('tabs.ocorrencias', {
          url: '/ocorrencias',
          views: {
            'tab-ocorrencias': {
              templateUrl: 'templates/ocorrencias.html',
              controller: 'OcorrenciasController'
            }
          }
        })
        .state('tabs.nova_ocorrencia', {
          url: '/nova_ocorrencia',
          views: {
            'tab-ocorrencias': {
              templateUrl: 'templates/nova_ocorrencia.html',
              controller: 'NovaOcorrenciaController'
            }
          }
        });

      $urlRouterProvider.otherwise('home');
    }]);
