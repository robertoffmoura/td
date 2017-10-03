(function () {
  'use strict';

  angular
    .module('App')
    .controller('HomeController', HomeController);

  HomeController.$inject = ['$scope'];
  function HomeController($scope) {

    console.log('HomeController::');

  }
})();
