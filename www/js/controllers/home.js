(function () {
  'use strict';

  angular
    .module('App')
    .controller('HomeController', HomeController);

  HomeController.$inject = ['$ionicPlatform'];

  function HomeController($ionicPlatform) {

    console.log('HomeController::');
    $ionicPlatform.registerBackButtonAction(function () {
      // Altera o comportamento do backButton ao clicar com o botão físico do aparelho
      ionic.Platform.exitApp();
    }, 100);

  }


})();
