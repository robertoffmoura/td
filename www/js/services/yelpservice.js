var app = angular.module('App');

app.service("YelpService", function ($q, $http, $cordovaGeolocation, $ionicPopup, Occurrences, FirebaseData, $firebaseArray) {
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
						var ocrs = $firebaseArray(FirebaseData.refOccurrences);
						ocrs.$loaded().then(function(list) {
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

						// $http.get('https://api.codecraft.tv/samples/v1/coffee/', {params: params})
						// 	.success(function (data) {
						// 		console.log("YelpService::load():",data);

						// 		if (data.businesses.length == 0) {
						// 			self.hasMore = false;
						// 		} else {
						// 			angular.forEach(data.businesses, function (business) {
						// 				self.results.push(business);
						// 			});
						// 		}

						// 		self.isLoading = false;
						// 		deferred.resolve();
						// 	})
						// 	.error(function (data, status, headers, config) {
						// 		self.isLoading = false;
						// 		deferred.reject(data);
						// 	});

					}, function (err) {
						console.error("Error getting position");
						console.error(err);
						$ionicPopup.alert({
							'title': 'Please switch on geolocation',
							'template': "It seems like you've switched off geolocation for caffeinehit, please switch it on by going to you application settings."
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
