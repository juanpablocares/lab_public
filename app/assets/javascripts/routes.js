(function() {
	var labs = angular.module('lab');

	labs.config(function($authProvider) {
		$authProvider.configure({
			apiUrl : ''
		});
	});

	labs.config(function($stateProvider, $urlRouterProvider) {

		/*
		 * LoginRequired State
		 * Estado base para las url que requieren estar logueado.
		 * Debe ser precargado mediante loginRequired.nombreEstado
		 * OJO: Son solo comprobaciones clientside, igual debe hacerse comprobación en serverside.
		 */

		$stateProvider.state('loginRequired', {
			templateUrl : 'widgets/navBar.html',
			controller : 'NavBarController',
			resolve : {
				auth : function($auth, $state) {
					return $auth.validateUser().catch(function() {
						// redirect unauthorized users to the login page
						$state.go('login');
					});
				}
			}
		});

		$stateProvider.state('loginRequired.index', {
			url : '/',
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
			templateUrl : "sessions/cuenta/menu.html",
			controller : 'CuentaMenuController',
			resolve : {
				test : function() {
				}
			}
		});

		$stateProvider.state('loginRequired.account.info', {
			url : '/informacion',
			templateUrl : "sessions/cuenta/index.html",
			controller : 'CuentaIndexController',
		});

		$stateProvider.state('loginRequired.account.changePassword', {
			url : '/password',
			templateUrl : "sessions/cuenta/changePassword.html",
			controller : 'CuentaPasswordController',
		});
		
		$stateProvider.state('loginRequired.busqueda_ficha', {
			url : '/fichas/buscar',
			templateUrl : "fichas/search.html",
			controller : 'FichasSearchController',
			params : {
				rut_completo : null,
				text : null,
				rut: null,
				nombre : null,
				apellido_paterno : null,
				apellido_materno : null,
				prevision : null
			}
		});

		$stateProvider.state('loginRequired.nuevo_paciente', {
			url : '/pacientes/nuevo',
			templateUrl : "pacientes/new.html",
			controller : 'PacientesNewController',
			params : {
				rut_completo : null
			}
		});

		$stateProvider.state('loginRequired.busqueda_paciente', {
			url : '/pacientes/buscar',
			templateUrl : "pacientes/search.html",
			controller : 'PacientesSearchController',
			params : {
				rut_completo : null,
				text : null,
				rut: null,
				nombre : null,
				apellido_paterno : null,
				apellido_materno : null,
				prevision : null
			}
		});
		
		$stateProvider.state('loginRequired.pacientes', {
			url : '/pacientes/:paciente_id',
			templateUrl : "pacientes/menu.html",
			controller : 'PacientesMenuController',
		});

		$stateProvider.state('loginRequired.pacientes.info', {
			url : '/informacion',
			templateUrl : "pacientes/index.html",
			controller : 'PacientesIndexController',
			params: {paciente: null}
		});
		
		$stateProvider.state('loginRequired.pacientes.fichas', {
			url : '/informacion',
			templateUrl : "pacientes/fichas.html",
			controller : 'PacientesFichasController',
			params: {paciente: null}
		});
		
		$stateProvider.state('loginRequired.pacientes.asignarExamenes', {
			url : '/asignarExamenes',
			templateUrl : "fichas/new.html",
			controller : 'FichasNewController',
		});
		
		$stateProvider.state('loginRequired.fichas', {
			url : '/fichas/:fichas_id',
			templateUrl : "fichas/index.html",
			controller : 'FichasIndexController',
		});

		/*
		 * Login State
		 * No necesita estar logueado para poder ser visto. De hecho es la única url permitida sin login.
		 */
		$stateProvider.state('login', {
			url : '/login',
			controller : 'LoginController',
			templateUrl : "sessions/login.html",
			resolve : {
				auth : function($auth, $state) {
					return !$auth.validateUser().then(function() {
						// redirect if logged in
						$state.go('loginRequired.index');
					});
				}
			}
		});

		/*
		 * Logout State
		 */

		$stateProvider.state('loginRequired.logout', {
			url : '/logout',
			controller : 'LogoutController'
		});

		$urlRouterProvider.otherwise('/');

	});
})();
