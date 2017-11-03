(function () {
  'use strict';

  angular
    .module('App')
    .controller('NewOccurrenceController', NewOccurrenceController);

  NewOccurrenceController.$inject = ['$scope', '$rootScope', '$state', '$ionicHistory', '$ionicViewSwitcher', 'Utils', 'Occurrences'];

  function NewOccurrenceController($scope, $rootScope, $state, $ionicHistory, $ionicViewSwitcher, Utils, Occurrences) {

    console.log('NewOccurrenceController::');

    Utils.getLocalStorage('dataUser').then(function (value) {
      $rootScope.dataUser = value;
    });

    $scope.occurrencesTypes = [
      {
        nome: 'Assalto'
      },
      {
        nome: 'Furto'
      },
      {
        nome: 'Tiroteio'
      }
    ];

    $scope.formData = {
      type: null,
      location: {},
      datetimeValue: null,
      description: null
    };

    $scope.createNewOccurrence = function (form) {
      if (!form.type) Utils.showAlert('Tipo', 'Por favor, escolha o tipo da ocorrência');
      else if (!form.location.geometry) Utils.showAlert('Local', 'Por favor, escolha o local da ocorrência');
      else if (!form.datetimeValue) Utils.showAlert('Data e Horário', 'Por favor, escolha a data e o horário da ocorrência');
      else {
        form.user = $rootScope.dataUser.name;
        form.lat = form.location.geometry.location.lat();
        form.lng = form.location.geometry.location.lng();
        console.log(form.lat, form.lng);
        // Limitar o registro das ocorrências apenas na Urca
        if (!(-22.962657 < form.lat && form.lat < -22.931238 && -43.185721 < form.lng && form.lng < -43.142599)) {
          Utils.showAlert('Local indisponível', 'Este aplicativo está disponível apenas para os moradores da Urca. Por favor, escolha apenas locais deste bairro.');
        } else {
          if (!form.description) {
            Utils.showConfirm('Sem Descrição', 'Deseja enviar esta ocorrência sem observações ou descrições?')
              .then(function (res) {
                if (res) {
                  console.log('Enviando', form);
                  // Enviar ocorrência para o banco;
                  Occurrences.pushOccurrence(form).then(function () {
                    $state.go('tabs.occurrences');
                    $ionicViewSwitcher.nextDirection('back');
                    $ionicHistory.nextViewOptions({
                      disableBack: true,
                      disableAnimate: true,
                      historyRoot: true
                    });
                  });
                } else {
                  console.log('Cancelado');
                }
              });
          } else {
            Occurrences.pushOccurrence(form).then(function () {
              $rootScope.lat = form.lat;
              $rootScope.lon = form.lng;
              $ionicViewSwitcher.nextDirection('back');
              $ionicHistory.nextViewOptions({
                disableBack: true,
                disableAnimate: true,
                historyRoot: true
              });
              $state.go('tabs.map');
            });
          }
        }
      }
    };

    $scope.goBack = function () {
      $ionicViewSwitcher.nextDirection('back');
      $ionicHistory.nextViewOptions({
        disableBack: true,
        disableAnimate: true,
        historyRoot: true
      });
      $state.go('tabs.occurrences');
    };

    $scope.onAddressSelection = function (location) {
      console.log(location);
      console.log('name:', location.name);
      console.log('icon:', location.icon);
      console.log('lat:', location.geometry.location.lat());
      console.log('lng:', location.geometry.location.lng());
      console.log('vicinity:', location.vicinity);
      if (location.photos !== undefined)
        console.log('photo Url:', location.photos[0].getUrl({'maxWidth': 100, 'maxHeight': 100}));

    };

  }
})();
