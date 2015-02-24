(function() {
	var labs = angular.module('lab');

	labs.config(function($authProvider) {
		$authProvider.configure({
			apiUrl : ''
		});
	});

	labs.config(function($stateProvider, $urlRouterProvider) {


		/*
		 * Login State
		 * No necesita estar logueado para poder ser visto. De hecho es la única url permitida sin login.
		 */
		$stateProvider.state('login', {
			url : '/login',
			controller : 'LoginController',
			templateUrl : "sessions/login.html",
		});

		/* 
		 * LoginRequired State
		 * Estado base para las url que requieren estar logueado.
		 * Debe ser precargado mediante loginRequired.nombreEstado
		 * OJO: Son solo comprobaciones clientside, igual debe hacerse comprobación en serverside.
		 */
		
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
		
		$stateProvider.state('loginRequired.logout', {
			url : '/logout',
			controller : 'LogoutController'
		});
		
		$stateProvider.state('loginRequired.index', {
			url : '',
			templateUrl : "recepcion/recepcion.html",
			controller : 'RecepcionController',
			resolve : {
				test : function() {
					console.log("Index test");
				}
			}
		});
		
		$stateProvider.state('loginRequired.account', {
			url : '/miCuenta',
			templateUrl : "sessions/cuenta.html",
			controller : 'CuentaController',
			resolve : {
				test : function(){
					console.log("Index test");
				}
			}
		});

		$urlRouterProvider.otherwise('');

	});
})();
