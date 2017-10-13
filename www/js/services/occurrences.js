(function () {
  'use strict';

  angular
    .module('App')
    .factory('Occurrences', Occurrences);

  Occurrences.$inject = ['$q', 'FirebaseData'];

  function Occurrences($q, FirebaseData) {

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

    self.pushOccurrence = function (title, description, lat, lng) {
      var timestamp = firebase.database.ServerValue.TIMESTAMP;
      var newOccurrenceRef = occurrencesDb.push();
      newOccurrenceRef.set({
        'title': title,
        'description': description,
        'location': {
          'lat': lat,
          'lng': lng
        },
        'timestamp': timestamp
      });
    };


    return self;

  }
})();
