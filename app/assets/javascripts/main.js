(function() {
	var labs = angular.module('lab', ['oitozero.ngSweetAlert', 'ngSanitize', 'ngCsv', 'ui.select', 'ngSanitize','smart-table', 'ngResource', 'platanus.rut', 'ui.mask', 'ui.router', 'templates', 'ng-token-auth']);

	labs.run(function($rootScope, $auth) {
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
