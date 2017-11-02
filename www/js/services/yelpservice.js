var app = angular.module('App');

app.service("YelpService", function ($q, $http, $cordovaGeolocation, Utils, Occurrences, FirebaseData, $firebaseArray) {
	var self = {
		'page': 1,
		'isLoading': false,
		'hasMore': true,
		'results': [],
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
		'load': function () {
		  console.log('YelpService:load()');
			self.isLoading = true;
			var deferred = $q.defer();

      // Pegar ocorrências perto de onde está
      // Alterar a restrição de acordo com uma quantidade pré determinada ou pela data
      var ocrs = $firebaseArray(FirebaseData.refOccurrences.limitToLast(100));
      ocrs.$loaded().then(function(list) {
        // Alterar local do carregamento se for utilizar a localização como parâmetro para a pesquisa
        console.log("YelpService::load()", list);

        if (list.lengnt === 0) {
          self.hasMore = false;
        } else {
          angular.forEach(list, function(ocr) {
            self.results.push(ocr);
          });
        }
        self.isLoading = false;
        deferred.resolve();

      }).catch(function(error) {
        self.isLoading = false;
        deferred.reject(error);
      });

      ionic.Platform.ready(function () {
				$cordovaGeolocation
					.getCurrentPosition({timeout: 10000, enableHighAccuracy: false})
					.then(function (position) {
            console.log("YelpService::getCurrentPosition");
						self.lat = position.coords.latitude;
						self.lon = position.coords.longitude;

						var params = {
							page: self.page,
							lat: self.lat,
							lon: self.lon
						};

					}, function (err) {
						console.error("Error getting position");
						console.error(err);
						Utils.showAlert('Por favor habilite seu GPS', 'Parece que o serviço de localização do seu ' +
              'aparelho está indisponível. Habilite essa opção nas configurações do aparelho.');
					})
			});

			return deferred.promise;
		}
	};

  // Load the data and then paginate twice
	self.load().then(function () {
		self.next().then(function () {
			self.next();
		})
	});

	return self;
});
