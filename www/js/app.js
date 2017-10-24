var app = angular.module('App', [
	'ionic',
  'ngMap',
  'ngCordova',
  'ion-google-autocomplete',
	'ion-datetime-picker',
	'firebase'
]);

app.run(function ($ionicPlatform) {
	$ionicPlatform.ready(function () {
		// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
		// for form inputs)
		if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
			cordova.plugins.Keyboard.disableScroll(true);

		}
		if (window.StatusBar) {
			// org.apache.cordova.statusbar required
			StatusBar.styleDefault();
		}
	});
});
app.run(function($ionicPickerI18n) {
    $ionicPickerI18n.weekdays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
    $ionicPickerI18n.months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    $ionicPickerI18n.ok = "Ok";
    $ionicPickerI18n.cancel = "Cancelar";
    $ionicPickerI18n.okClass = "button-positive";
    $ionicPickerI18n.cancelClass = "button-stable";
    $ionicPickerI18n.arrowButtonClass = "button-positive";
  });

app.config(function ($httpProvider) {
	$httpProvider.defaults.headers.common['Authorization'] = 'Token 67a8a588c741ca719846e0fa38e8f7103d5da4dc';
});
