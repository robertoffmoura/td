var app = angular.module('App');

app.service("YelpService", function ($q, $http, $cordovaGeolocation, Utils, Occurrences, FirebaseData, $firebaseArray, $rootScope) {
  var self = {
    'page': 1,
    'isLoading': false,
    'hasMore': true,
    'results': [],
    'ocr': {},
    'lat': -22.954616,
    'lon': -43.166817,
    'refresh': function () {
      self.page = 1;
      self.isLoading = false;
      self.hasMore = true;
      self.results = [];
      return self.load();
    },
    'next': function () {
      self.page += 1;
      return self.load();
    },
    'getPos': function () {
      ionic.Platform.ready(function () {
        var d = $q.defer();
        $cordovaGeolocation
          .getCurrentPosition({timeout: 10000, enableHighAccuracy: false})
          .then(function (position) {
            console.log("YelpService::getCurrentPosition");
            self.lat = position.coords.latitude;
            self.lon = position.coords.longitude;
            var params = {
              lat: self.lat,
              lon: self.lon
            };
            $rootScope.lat = self.lat;
            $rootScope.lon = self.lon;
            d.resolve(params);
          }, function (err) {
            console.log("Error getting position");
            console.log(err);
            d.reject(err);
            Utils.showAlert('Por favor habilite seu GPS', 'Parece que o serviço de localização do seu ' +
              'aparelho está indisponível. Habilite essa opção nas configurações do aparelho.');
          });
        return d.promise;
      });
    },
    'load': function () {
      console.log('YelpService:load()');
      self.isLoading = true;
      var deferred = $q.defer();

      // Pegar ocorrências perto de onde está
      // Alterar a restrição de acordo com uma quantidade pré determinada ou pela data
      var ocrs = $firebaseArray(FirebaseData.refOccurrences.limitToLast(100));
      ocrs.$loaded().then(function (list) {
        // Alterar local do carregamento se for utilizar a localização como parâmetro para a pesquisa
        console.log(list);

        if (list.lengnt === 0) {
          self.hasMore = false;
        } else {
          angular.forEach(list, function (item) {
            ocr = item;
            switch (ocr.title) {
              case "Tiroteio":
                ocr.icon = "marker-shooting.png";
                break;
              case "Assalto":
                ocr.icon = "marker-robbery.png";
                break;
              case "Furto":
                ocr.icon = "marker-theft.png";
                break;
              case "Assédio":
                ocr.icon = "marker-harassment.png";
                break;
              default:
                ocr.icon = "coffee-marker.png"
            }
            self.results.push(ocr);
          });
        }
        self.isLoading = false;
        deferred.resolve();

      }).catch(function (error) {
        self.isLoading = false;
        deferred.reject(error);
      });

      return deferred.promise;
    }
  };

  self.load();

  return self;
});
