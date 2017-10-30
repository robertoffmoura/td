var app = angular.module('App');

app.service("YelpService", function ($q, $http, $cordovaGeolocation, $ionicPopup) {
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
			self.isLoading = true;
			var deferred = $q.defer();

			ionic.Platform.ready(function () {
				$cordovaGeolocation
					.getCurrentPosition({timeout: 10000, enableHighAccuracy: false})
					.then(function (position) {
						self.lat = position.coords.latitude;
						self.lon = position.coords.longitude;

						var params = {
							page: self.page,
							lat: self.lat,
							lon: self.lon
						};

						//Pegar ocorrências perto de onde se está

						$http.get('https://api.codecraft.tv/samples/v1/coffee/', {params: params})
							.success(function (data) {
								console.log("YelpService::load():",data);

								if (data.businesses.length == 0) {
									self.hasMore = false;
								} else {
									angular.forEach(data.businesses, function (business) {
										self.results.push(business);
									});
								}

								self.isLoading = false;
								deferred.resolve();
							})
							.error(function (data, status, headers, config) {
								self.isLoading = false;
								deferred.reject(data);
							});

					}, function (err) {
						console.error("Error getting position");
						console.error(err);
						$ionicPopup.alert({
							'title': 'Por favor habilite seu GPS',
							'template': "Parece que o serviço de localização do seu aparelho está indisponível. Habilite essa opção nas configurações do aparelho."
						});
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
