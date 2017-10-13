(function () {
  'use strict';

  angular
    .module('App')
    .controller('OcorrenciasController', OcorrenciasController);

  OcorrenciasController.$inject = ['$scope', '$ionicPlatform', '$state', '$ionicHistory'];
  function OcorrenciasController($scope, $ionicPlatform, $state, $ionicHistory) {

    console.log('OcorrenciasController::');

    // Altera o comportamento do backButton
    $ionicPlatform.registerBackButtonAction(function () {
      var currentState = $state.current.name;
      console.log('BackButton pressed on state:', currentState);

      if (currentState === 'tabs.mapa') {
        $ionicHistory.nextViewOptions({
          disableBack: true,
          disableAnimate: true,
          historyRoot: true
        });
        $state.go('home');
      }
    }, 100);


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
