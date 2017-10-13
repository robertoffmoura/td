(function () {
    'use strict';

    angular
    .module('App')
    .controller('HomeController', HomeController);

    HomeController.$inject = ['$scope'];
    function HomeController($scope) {

        console.log('HomeController::');

    }
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyAwdikiu8Hjedz3vACo0QZ6_-Ou4q3QV5g",
        authDomain: "urcasafety.firebaseapp.com",
        databaseURL: "https://urcasafety.firebaseio.com",
        projectId: "urcasafety",
        storageBucket: "urcasafety.appspot.com",
        messagingSenderId: "372304408805"
    };
    firebase.initializeApp(config);


})();
