(function () {
  'use strict';

  angular
    .module('App')
    .controller('TabsController', TabsController);

  TabsController.$inject = ['$scope', '$ionicPlatform', '$state', '$ionicHistory', '$ionicViewSwitcher'];
  function TabsController($scope, $ionicPlatform, $state, $ionicHistory, $ionicViewSwitcher) {

    console.log('TabsController::');

    $ionicPlatform.registerBackButtonAction(function () {
      // Altera o comportamento do backButton ao clicar com o botão físico do aparelho
      var currentState = $state.current.name;
      console.log('BackButton pressed on state:', currentState);
      if (currentState === 'tabs.map') {
        $ionicViewSwitcher.nextDirection('back');
        $ionicHistory.nextViewOptions({
          disableBack: true,
          disableAnimate: true,
          historyRoot: true
        });
        $state.go('home');
      } else if (currentState === 'home') {
        ionic.Platform.exitApp();
      } else {
        $ionicHistory.goBack();
      }
    }, 100);

    $scope.backToHome = function () {
      $ionicViewSwitcher.nextDirection('back');
      $ionicHistory.nextViewOptions({
        disableBack: true,
        disableAnimate: true,
        historyRoot: true
      });
      $state.go('home');
    };

    $scope.backToMap = function () {
      $ionicViewSwitcher.nextDirection('back');
      $ionicHistory.nextViewOptions({
        disableBack: true,
        disableAnimate: true,
        historyRoot: true
      });
      $state.go('tabs.map');
    };

    $scope.goOccurrences = function () {
      $state.go("tabs.occurrences");
    }

  }
})();
