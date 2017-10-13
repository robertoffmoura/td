(function () {
  'use strict';

  angular
    .module('App')
    .controller('OcorrenciasController', OcorrenciasController);

  OcorrenciasController.$inject = ['$scope', '$ionicPlatform', '$state', '$ionicHistory', '$ionicViewSwitcher'];
  function OcorrenciasController($scope, $ionicPlatform, $state, $ionicHistory, $ionicViewSwitcher) {

    console.log('OcorrenciasController::');



    var occurrencesDb = firebase.database().ref().child('occurrences');

    occurrencesDb.on('value', snap => console.log(snap.val()));
    occurrencesDb.once('value').then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            console.log(childSnapshot.child('title').val());
        })
    });

    occurrencesDb.once('value').then(function(snapshot) {
        $scope.listOccurrences = snapshot.exportVal();
    });

    $scope.pushOccurrence = function(title, description, lat, long) {
        var d = new Date();
        var newOccurrenceRef = occurrencesDb.push();
        newOccurrenceRef.set({
            'title': title,
            'description': description,
            'location': {
                'lat': lat,
                'long': long
            },
            'time': d.toString(),
        });
    }

    $scope.displayTime = function(occurrence) {
        var d = new Date(occurrence.time);
        return d.toLocaleDateString("pt-BR")
    }

  }
})();
