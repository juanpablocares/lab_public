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
		
		$stateProvider.state('loginRequired.busqueda_examen', {
			url : '/lista_examenes/buscar',
			templateUrl : "lista_examenes/search.html",
			controller : 'ListaExamenesSearchController'
		});
		
		$stateProvider.state('loginRequired.busqueda_ficha', {
			url : '/fichas',
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
		/* Rutas de Fichas*/
		$stateProvider.state('loginRequired.fichas', {
			url : '/fichas/:ficha_id',
			templateUrl : "fichas/menu.html",
			controller : 'FichasMenuController',
			params: {paciente: null}
		});
		
		$stateProvider.state('loginRequired.fichas.info', {
			url : '/informacion',
			templateUrl : "fichas/index.html",
			controller : 'FichasIndexController',
			params: {ficha: null}
		});
		
		$stateProvider.state('loginRequired.fichas.pagos', {
			url : '/pagos',
			templateUrl : "fichas/pagos.html",
			controller : 'FichasPagosController',
			params: {ficha: null}
		});
		
		$stateProvider.state('loginRequired.fichas.examenes', {
			url : '/examenes',
			templateUrl : "fichas/examenes.html",
			controller : 'FichasExamenesController',
			params: {ficha: null}
		});
		
		/*Rutas de pacientes*/
		
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
			url : '/fichas',
			templateUrl : "pacientes/fichas.html",
			controller : 'PacientesFichasController',
			params: {paciente: null}
		});
		
		$stateProvider.state('loginRequired.pacientes.examenes', {
			url : '/examenes',
			templateUrl : "pacientes/examenes.html",
			controller : 'PacientesExamenesController',
			params: {paciente: null}
		});
		
		$stateProvider.state('loginRequired.pacientes.asignarExamenes', {
			url : '/asignarExamenes',
			templateUrl : "fichas/new.html",
			controller : 'FichasNewController',
		});
		
		$stateProvider.state('loginRequired.pacientes.ficha', {
			url : '/ficha/:ficha_id',
			templateUrl : "fichas/index.html",
			controller : 'FichasIndexController',
		});
		
		/*Rutas de listado de examenes */
		
		$stateProvider.state('loginRequired.lista_examenes', {
			url : '/lista_examenes/:examen_id',
			templateUrl : "lista_examenes/menu.html",
			controller : 'ListaExamenesMenuController',
		});
		
		$stateProvider.state('loginRequired.lista_examenes.info', {
			url : '/informacion',
			templateUrl : "lista_examenes/index.html",
			controller : 'ListaExamenesIndexController',
			params: {examen: null}
		});
		
		/*Rutas de examenes a pacientes*/
		
		$stateProvider.state('loginRequired.examenes', {
			url : '/examenes/:id',
			templateUrl : "examenes/menu.html",
			controller : 'ExamenesMenuController',
		});
		
		$stateProvider.state('loginRequired.examenes.info', {
			url : '/informacion',
			templateUrl : "examenes/index.html",
			controller : 'ExamenesIndexController',
			params: {examen: null}
		});
		
		/*Rutas tipos tarifas*/
		
		$stateProvider.state('loginRequired.busqueda_tarifas', {
			url : '/tarifas/buscar',
			templateUrl : "tarifas/search.html",
			controller : 'TarifasSearchController',
		});
		
		$stateProvider.state('loginRequired.tarifas', {
			url : '/tarifas/:tarifa_id',
			templateUrl : "tarifas/menu.html",
			controller : 'TarifasMenuController',
		});
		
		$stateProvider.state('loginRequired.tarifas.info', {
			url : '/informacion',
			templateUrl : "tarifas/index.html",
			controller : 'TarifasIndexController',
			params: {tarifa: null}
		});
		
		/*Rutas de muestras*/
		
		$stateProvider.state('loginRequired.busqueda_muestras', {
			url : '/muestras/buscar',
			templateUrl : "muestras/search.html",
			controller : 'MuestrasSearchController',
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
		
		$stateProvider.state('loginRequired.muestras', {
			url : '/muestras/:ficha_id',
			templateUrl : "muestras/menu.html",
			controller : 'MuestrasMenuController',
		});
		
		$stateProvider.state('loginRequired.muestras.info', {
			url : '/informacion',
			templateUrl : "muestras/index.html",
			controller : 'MuestrasIndexController',
			params: {muestra: null}
		});
		
		$stateProvider.state('loginRequired.muestras.examenes', {
			url : '/examenes',
			templateUrl : "muestras/examenes.html",
			controller : 'MuestrasExamenesController',
		});
		
		$stateProvider.state('loginRequired.muestras.ingresar_resultados', {
			url : '/examenes',
			templateUrl : "muestras/examenes.html",
			controller : 'MuestrasExamenesController',
		});
		
		//Lista de muestras tomadas disponibles para ingreso de resultados
		
		$stateProvider.state('loginRequired.lista_ingreso_resultados_examen', {
			url : '/resultados/muestras',
			templateUrl : "resultados/muestras_tomadas_search.html",
			controller : 'ResultadosMuestrasTomadasController',
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
