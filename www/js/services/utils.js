(function () {
  'use strict';

  angular
    .module('App')
    .factory('Utils', Utils);

  Utils.$inject = ['$ionicLoading', '$ionicPopup', '$q'];
  function Utils($ionicLoading, $ionicPopup, $q) {

    var functionObj = {};

    functionObj.showLoading = function(){
      $ionicLoading.show({
        content: '<i class="ion-loading-c"></i> ', // The text to display in the loading indicator
        animation: 'fade-in', // The animation to use
        showBackdrop: true, // Will a dark overlay or backdrop cover the entire view
        maxWidth: 200, // The maximum width of the loading indicator. Text will be wrapped if longer than maxWidth
        showDelay: 50 // The delay in showing the indicator
      });
    };

    functionObj.hideLoading = function(){
      $ionicLoading.hide();
    };

    functionObj.showAlert = function(title, message) {
      $ionicPopup.alert({
        title: title,
        template: message,
        cssClass: 'animated bounceInDown',
        buttons: [{
          text: 'OK',
          type: 'button-orange'
        }]
      });
    };

    functionObj.setLocalStorage = function (nome, value) {
      console.log('Utils::setLocalStorage: Salvando ' + nome + ' em Local Storage (offline)');
      window.localStorage.setItem(nome, JSON.stringify(value));
    };

    functionObj.removeLocalStorage = function (nome) {
      console.log('Utils::removeLocalStorage: Apagando ' + nome + ' em Local Storage (offline)');
      window.localStorage.removeItem(nome);
    };

    functionObj.getLocalStorage = function (nome) {
      console.log('Utils::getLocalStorage: Carregando ' + nome + ' de Local Storage (offline)');
      var d = $q.defer();
      var value = window.localStorage.getItem(nome);
      value = value && JSON.parse(value);
      if (value) {
        d.resolve(value);
      } else {
        d.reject();
      }
      return d.promise;
    };

    return functionObj;
  }
})();











