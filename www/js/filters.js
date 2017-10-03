var app = angular.module('App');

app.filter("join", function () {
	return function (arr, sep) {
		return arr.join(sep);
	};
});
