angular
  .module('App')
  .config(['$stateProvider', '$urlRouterProvider', '$ionicConfigProvider',
    function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

      $ionicConfigProvider.navBar.alignTitle('center');

      $ionicConfigProvider.tabs.position('bottom');

      $ionicConfigProvider.scrolling.jsScrolling(ionic.Platform.isIOS());

      $stateProvider
        .state('home', {
          url: '/home',
          templateUrl: 'templates/home.html',
          controller: 'HomeController'
        })
        .state('about', {
          url: '/about',
          templateUrl: 'templates/about.html',
          controller: 'AboutController'
        })
        .state('tabs', {
          url: '/tabs',
          abstract: true,
          templateUrl: 'templates/tabs.html',
          controller: 'TabsController'
        })
        .state('tabs.map', {
          url: '/map',
          views: {
            'tab-map': {
              templateUrl: 'templates/map.html',
              controller: 'MapController'
            }
          }
        })
        .state('tabs.occurrences', {
          url: '/occurrences',
          views: {
            'tab-occurrences': {
              templateUrl: 'templates/occurrences.html',
              controller: 'OccurrencesController'
            }
          }
        })
        .state('tabs.new_occurrence', {
          url: '/new_occurrence',
          views: {
            'tab-occurrences': {
              templateUrl: 'templates/new_occurrence.html',
              controller: 'NewOccurrenceController'
            }
          }
        });

      $urlRouterProvider.otherwise('home');
    }]);
