(function () {
  'use strict';

  angular
    .module('App')
    .controller('HomeController', HomeController);

  HomeController.$inject = ['$ionicPlatform'];

  function HomeController($ionicPlatform) {

    console.log('HomeController::');


  }


})();
