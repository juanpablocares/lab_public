(function() {
	var labs = angular.module('lab', ['ngSanitize', 'ngCsv', //'ui.select', 
		'ngSanitize','smart-table', 'ngResource', 'ngAnimate',
		'platanus.rut', 'ui.router', 'templates', 'ui.bootstrap', 'ngAside',
		'ng-token-auth', 'ngDialog', 'chart.js', 'lrInfiniteScroll']);

	labs.run(function($rootScope, $auth, regionesService) {

		$rootScope.$on('auth:login-success', function(ev) {
			console.log('login-success');
		});
		$rootScope.$on('auth:login-error', function(ev) {
			console.log('login-error');
		});
		$rootScope.$on('auth:validation-success', function(ev) {
			console.log('validation-success');
		});
		$rootScope.$on('auth:validation-error', function(ev) {
			console.log('validation-error');
		});
		$rootScope.$on('auth:invalid', function(ev) {
			console.log('validation-invalid');
		});
		$rootScope.$on('auth:logout-success', function(ev) {
			console.log('logout-success');
		});
		$rootScope.$on('auth:logout-error', function(ev) {
			console.log('logout-error');
		});
	});
})();