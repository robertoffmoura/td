(function () {
  'use strict';

  angular
    .module('App')
    .controller('TabsController', TabsController);

  TabsController.$inject = ['$scope', '$ionicPlatform', '$state', '$ionicHistory', '$ionicViewSwitcher'];
  function TabsController($scope, $ionicPlatform, $state, $ionicHistory, $ionicViewSwitcher) {

    console.log('TabsController::');

    // Altera o comportamento do backButton ao clicar com o botão físico do aparelho
    $ionicPlatform.registerBackButtonAction(function () {
      var currentState = $state.current.name;
      console.log('BackButton pressed on state:', currentState);

      if (currentState === 'tabs.mapa') {
        $ionicViewSwitcher.nextDirection('back');
        $ionicHistory.nextViewOptions({
          disableBack: true,
          disableAnimate: true,
          historyRoot: true
        });
        $state.go('home');
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


  }
})();
