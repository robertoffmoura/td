(function () {
  'use strict';

  angular
    .module('App')
    .factory('Occurrences', Occurrences);

  Occurrences.$inject = ['$q', 'FirebaseData', 'Utils', '$state'];

  function Occurrences($q, FirebaseData, Utils, $state) {

    var self = {
      list: []
    };

    self.loadOccurrences = function () {
      var d = $q.defer();
      FirebaseData.refOccurrences.once('value')
        .then(function (snap) {
          d.resolve(snap.val());
          self.list = snap.val();
        })
        .catch(function (err) {
          console.log(err)
        });
      return d.promise;
    };

    self.pushOccurrence = function (ocr) {
      Utils.showLoading();
      var timestamp = firebase.database.ServerValue.TIMESTAMP;
      var newOccurrenceRef = FirebaseData.refOccurrences.push().key;
      FirebaseData.refOccurrences.child(newOccurrenceRef).update({
        'title': ocr.type,
        'description': ocr.description,
        'location': {
          'lat': ocr.lat,
          'lng': ocr.lng
        },
        'datetimeOcr': Date.parse(ocr.datetimeValue)/1000,
        'timestamp': timestamp
      }).then(function(){
        Utils.hideLoading();
        Utils.showAlert('Muito Obrigado', 'Ocorrência registrada com sucesso.');
        // Da sobreposição no back button quando registra ocorrência clicando pelo + do mapa
        $state.go('tabs.occurrences');
      });
    };


    return self;

  }
})();
