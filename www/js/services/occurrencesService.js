(function () {
  'use strict';

  angular
    .module('App')
    .factory('Occurrences', Occurrences);

  Occurrences.$inject = ['$q', 'FirebaseData', 'Utils', '$firebaseArray'];

  function Occurrences($q, FirebaseData, Utils, $firebaseArray) {

    var self = {
      list: []
    };

    self.loadOccurrences = function () {
      var d = $q.defer();
      self.list = $firebaseArray(FirebaseData.refOccurrences);
      self.list.$loaded(function (data) {
        d.resolve(data);
        Utils.hideLoading();
      });
      return d.promise;
    };

    self.pushOccurrence = function (ocr) {
      var d = $q.defer();

      Utils.showLoading();
      console.log(ocr);
      var timestamp = firebase.database.ServerValue.TIMESTAMP;
      var newOccurrenceRef = FirebaseData.refOccurrences.push().key;

      var img = '';
      if (ocr.location.photos !== undefined)
        img = ocr.location.photos[0].getUrl({'maxWidth': 120, 'maxHeight': 100});
      FirebaseData.refOccurrences.child(newOccurrenceRef).update({
        'title': ocr.type,
        'user': ocr.user,
        'description': ocr.description,
        'location': {
          'lat': ocr.lat,
          'lng': ocr.lng,
          'display_address': ocr.location.vicinity
        },
        'image_url': img,
        'datetimeOcr': Date.parse(ocr.datetimeValue) / 1000,
        'timestamp': timestamp

      }).then(function () {
        Utils.hideLoading();
        Utils.showAlert('Muito Obrigado', 'Ocorrência registrada com sucesso.');
        d.resolve();
      });

      return d.promise;
    };

    return self;

  }
})();