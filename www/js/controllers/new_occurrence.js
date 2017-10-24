(function () {
  'use strict';

  angular
    .module('App')
    .controller('NewOccurrenceController', NewOccurrenceController);

  NewOccurrenceController.$inject = ['$scope', '$ionicPlatform', '$state', '$ionicHistory', '$ionicViewSwitcher', 'Utils', 'Occurrences'];

  function NewOccurrenceController($scope, $ionicPlatform, $state, $ionicHistory, $ionicViewSwitcher, Utils, Occurrences) {

    console.log('NewOccurrenceController::');


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
      location: [],
      datetimeValue: null,
      description: null
    };

    $scope.createNewOccurrence = function(form) {
      form.lat = form.location.geometry.location.lat();
      form.lng = form.location.geometry.location.lng();
      console.log(form.lat, form.lng);
      if(!form.type) Utils.showAlert('Tipo','Por favor, escolha o tipo da ocorrência');
      else if(!form.location) Utils.showAlert('Local','Por favor, escolha o local da ocorrência');
      else if(!form.datetimeValue) Utils.showAlert('Data e Horário', 'Por favor, escolha a data e o horário da ocorrência');
      else {
        if(!form.description) {
          Utils.showConfirm('Sem Descrição', 'Desja enviar esta ocorrência sem observações ou descrições?')
            .then(function(res){
              if(res) {
                console.log('Enviando', form);
                // Enviar ocorrência para o banco;
                Occurrences.pushOccurrence(form);
              } else {
                console.log('Cancelado');
              }
            });
        } else {
          Occurrences.pushOccurrence(form);
          $state.go('tabs.occurrences');
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
