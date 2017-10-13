(function () {
  'use strict';

  angular
    .module('App')
    .factory('FirebaseData', FirebaseData);

  FirebaseData.$inject = [];
  function FirebaseData() {
    var rootRef = firebase.database().ref();
    return {

      ref: rootRef,
      refOccurrences: rootRef.child('occurrences')


    };
  }
})();
