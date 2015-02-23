(function() {
	var labs = angular.module('lab', ['ui.bootstrap', 'ui.router', 'templates', 'ng-token-auth']).config(function($authProvider) {
		$authProvider.configure({
			apiUrl : ''
		});
	}).config(function($stateProvider, $urlRouterProvider) {

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
		
	}).directive('navBar', function() {
		return {
			restrict : 'E',
			templateUrl : 'widgets/navBar.html',
			controller : 'NavBarController'
		};
	}).run(function($rootScope, $urlRouter, $auth, $location) {
		$rootScope.$on('$locationChangeSuccess', function(evt) {
			evt.preventDefault();

		});
	});
})();
