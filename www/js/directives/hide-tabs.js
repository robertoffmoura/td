(function () {
  'use strict';

  angular
    .module('App')
    .directive('hideTabs', function ($rootScope) {
      return {
        restrict: 'A',
        link: function ($scope, $el) {
          $rootScope.hideTabs = 'tabs-item-hide';
          $scope.$on('$destroy', function () {
            $rootScope.hideTabs = '';
          });
        }
      };
    });

})();
