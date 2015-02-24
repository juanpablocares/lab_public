(function() {
	var labs = angular.module('lab');

	labs.config(function($authProvider) {
		$authProvider.configure({
			apiUrl : ''
		});
	});

	labs.config(function($stateProvider, $urlRouterProvider) {

		$stateProvider.state('loginRequired', {
			templateUrl : 'widgets/navBar.html',
			resolve : {
				test : function() {
					console.log("loginRequired Test Message");
				},
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
			controller : 'LoginController',
			templateUrl : "sessions/login.html",
		});
		$stateProvider.state('logout', {
			url : '/logout',
			controller : 'LogoutController'
		});
		$stateProvider.state('loginRequired.index', {
			url : '',
			template : "WENA REQL",
			resolve : {
				test : function() {
					console.log("Index test");
				}
			}
		});

		$urlRouterProvider.otherwise('');

	});
})();
