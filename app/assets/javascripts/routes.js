(function() {
	var labs = angular.module('lab');

	labs.config(function($authProvider) {
		$authProvider.configure({
			apiUrl : ''
		});
	});

	labs.config(function($stateProvider, $urlRouterProvider) {

		$stateProvider.state('loginRequired', {
			resolve : {
				auth : function($auth, $state) {
					return $auth.validateUser().catch(function() {
						// redirect unauthorized users to the login page
						$state.go('login');
					});
				}
			}
		});
		$stateProvider.state('login', {
			url : '/login',
			templateUrl : "sessions/login.html",
			controller : 'LoginController'
		}).state('logout', {
			url : '/logout',
			controller : 'LogoutController'
		}).state('loginRequired.index', {
			url : '/home',
			template : "hola, esto es el main",
		});

		$urlRouterProvider.otherwise('/home');

	});
})();
