(function () {
  'use strict';

  angular
    .module('App')
    .controller('AboutController', AboutController);

  AboutController.$inject = ['$scope'];
  function AboutController($scope) {

    console.log('AboutController::');

  }
})();
