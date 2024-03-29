(function() {
	var labs = angular.module('lab');

	labs.config(function($authProvider) {
		$authProvider.configure({
			apiUrl : ''
		});
	});

	labs.config(function ($urlMatcherFactoryProvider) {
		$urlMatcherFactoryProvider.caseInsensitive(true);
		$urlMatcherFactoryProvider.strictMode(false);
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
			templateUrl : "index.html",
			controller : 'IndexController',
			resolve : {
				test : function() {
					console.log("Index test");
				}
			}
		});

		$stateProvider.state('loginRequired.menu_consultas', {
			url : '/menu_consultas',
			templateUrl : "index.html",
			controller : 'IndexMenuConsultasController',
			resolve : {
				test : function() {
					console.log("menu consultas");
				}
			}
		});
		
		$stateProvider.state('loginRequired.menu_configuracion', {
			url : '/menu_configuracion',
			templateUrl : "index.html",
			controller : 'IndexMenuConfiguracionController',
			resolve : {
				test : function() {
					console.log("menu configuracion");
				}
			}
		});
		
		$stateProvider.state('loginRequired.menu_administracion', {
			url : '/menu_administracion',
			templateUrl : "index.html",
			controller : 'IndexMenuAdministracionController',
			resolve : {
				test : function() {
					console.log("menu administracion");
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
			url : '/fichas',
			templateUrl : "fichas/search.html",
			controller : 'FichasSearchController',
			params : {
			}
		});
		 
		$stateProvider.state('loginRequired.nuevo_paciente', {
			url : '/pacientes/nuevo',
			templateUrl : "pacientes/new.html",
			controller : 'PacientesNewController',
			params : {
				rut_completo : null,
				desde_barra: false,
			}
		});
		
		$stateProvider.state('loginRequired.nueva_ficha', {
			url : '/asignar_examenes/:paciente_id',
			templateUrl : "fichas/new.html",
			controller : 'FichasNewController',
		});

		$stateProvider.state('loginRequired.busqueda_paciente', {
			url : '/pacientes',
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
		$stateProvider.state('loginRequired.fichas.editar', {
			url : '/editar',
			templateUrl : "fichas/edit.html",
			controller : 'FichasEditController',
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

		/* Rutas de Cotizaciones*/
		
		$stateProvider.state('loginRequired.cotizaciones', {
			url : '/cotizaciones/:cotizacion_id',
			templateUrl : "cotizaciones/menu.html",
			controller : 'CotizacionesMenuController',
			params: {paciente: null}
		});
		
		$stateProvider.state('loginRequired.cotizaciones.info', {
			url : '/informacion',
			templateUrl : "cotizaciones/index.html",
			controller : 'CotizacionesIndexController',
			params: {cotizacion: null}
		});

		$stateProvider.state('loginRequired.cotizaciones.editar', {
			url : '/editar',
			templateUrl : "cotizaciones/edit.html",
			controller : 'CotizacionesEditController',
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
		
		$stateProvider.state('loginRequired.pacientes.ficha', {
			url : '/ficha/:ficha_id',
			templateUrl : "fichas/index.html",
			controller : 'FichasIndexController',
		});

		$stateProvider.state('loginRequired.pacientes.cotizaciones', {
			url : '/cotizaciones',
			templateUrl : "pacientes/cotizaciones.html",
			controller : 'PacientesCotizacionesController',
			params: {paciente: null}
		});

		$stateProvider.state('loginRequired.pacientes.cotizacion', {
			url : '/cotizaciones/:cotizacion_id',
			templateUrl : "cotizaciones/index.html",
			controller : 'CotizacionesIndexController',
		});
		
		/*Rutas de listado de examenes */
		
		$stateProvider.state('loginRequired.busqueda_examen', {
			url : '/busqueda_examenes',
			templateUrl : "examenes/search.html",
			controller : 'ExamenesSearchController'
		});
		
		$stateProvider.state('loginRequired.examenes', {
			url : '/examenes/:examen_id',
			templateUrl : "examenes/menu.html",
			controller : 'ExamenesMenuController',
		});
		
		/*$stateProvider.state('loginRequired.ficha_tecnica', {
			url : '/ficha_tecnica/:examen_id',
			templateUrl : "examenes/ficha_tecnica.html",
			controller : 'ExamenesFichaTecnicaController'
		});*/
		
		$stateProvider.state('loginRequired.examenes.info', {
			url : '/informacion',
			templateUrl : "examenes/index.html",
			controller : 'ExamenesIndexController',
			params: {examen: null}
		});
		
		$stateProvider.state('loginRequired.examenes.precios', {
			url : '/precios',
			templateUrl : "examenes/precios.html",
			controller : 'ExamenesPreciosController',
			params: {examen: null}
		});
		
		$stateProvider.state('loginRequired.examenes.referencia', {
			url : '/valores_referencia',
			templateUrl : "examenes/valores_referencia.html",
			controller : 'ExamenesReferenciaController',
			params: {examen: null}
		});
		
		$stateProvider.state('loginRequired.examenes.parametros', {
			url : '/parametros',
			templateUrl : "examenes/parametros.html",
			controller : 'ExamenesParametrosController',
			params: {examen: null}
		});
		
		/*Rutas de examenes a pacientes*/
		
		$stateProvider.state('loginRequired.busqueda_ingreso_resultados', {
			url : '/busqueda_ingreso_resultados',
			templateUrl : "ordenes/search.html",
			controller : 'OrdenesExamenSearchController',
		});
		
		/*$stateProvider.state('loginRequired.ordenes_examen', {
			url : '/orden/:ficha_id',
			templateUrl : "ordenes/menu.html",
			controller : 'OrdenesExamenMenuController',
		});
		
		$stateProvider.state('loginRequired.ordenes_examen', {
			url : '/orden/:ficha_id',
			templateUrl : "ordenes/index.html",
			controller : 'OrdenesExamenIndexController',
		});
		
		$stateProvider.state('loginRequired.ordenes_examen.ingreso_muestra', {
			url : '/ingreso_muestra',
			templateUrl : "ordenes/ingreso_muestra.html",
			controller : 'OrdenesExamenIngresoMuestraController',
		});
		
		$stateProvider.state('loginRequired.ordenes_examen.resultados', {
			url : '/resultados',
			templateUrl : "ordenes/resultados.html",
			controller : 'OrdenesExamenResultadosController',
		});*/
		
		$stateProvider.state('loginRequired.ingreso_resultados', {
			url : '/resultados/:ficha_id',
			templateUrl : "ordenes/ingreso_resultados.html",
			controller : 'OrdenesExamenIngresoResultadosController',
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
		
		$stateProvider.state('loginRequired.tarifas.examenes', {
			url : '/examenes',
			templateUrl : "tarifas/examen.html",
			controller : 'TarifasExamenSearchController',
			params: {tarifa: null}
		});
		
		$stateProvider.state('loginRequired.csv_tarifa', {
			url : '/actualizar_tarifas',
			templateUrl : "tarifas/examenes.html",
			controller : 'TarifasExamenesController',
			params: {tarifa: null}
		});
		
		/*Rutas de muestras*/
		
		$stateProvider.state('loginRequired.busqueda_muestras', {
			url : '/muestras/buscar/:fecha_anterior',
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
			templateUrl: 'sessions/pedir_password.html',
			controller: 'PedirPasswordController',
			params: {}
		});

		$stateProvider.state('loginRequired.muestras.info_password_validado',{
			url: '/informacion',
			templateUrl: "muestras/index.html",
			controller: 'MuestrasIndexController'
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
		
		/*Rutas Previsiones*/
		
		$stateProvider.state('loginRequired.busqueda_previsiones', {
			url : '/previsiones/buscar',
			templateUrl : "previsiones/search.html",
			controller : 'PrevisionesSearchController',
		});
		
		$stateProvider.state('loginRequired.previsiones', {
			url : '/previsiones/',
			templateUrl : "otros/previsiones.html",
			controller : 'OtrosPrevisionesController',
		});
		
		/*$stateProvider.state('loginRequired.previsiones', {
			url : '/previsiones/:prevision_id',
			templateUrl : "previsiones/menu.html",
			controller : 'PrevisionesMenuController',
		});*/
		
		$stateProvider.state('loginRequired.nueva_prevision', {
			url : '/previsiones/nuevo',
			templateUrl : "previsiones/new.html",
			controller : 'PrevisionesNewController',
		});
		
		$stateProvider.state('loginRequired.previsiones.info', {
			url : '/informacion',
			templateUrl : "previsiones/index.html",
			controller : 'PrevisionesIndexController',
			params: {prevision: null}
		});
		
		/*Facturas*/
		$stateProvider.state('loginRequired.facturas', {
			url : '/facturas',
			templateUrl : "facturas/menu.html",
			controller : 'FacturasMenuController',
		});
		
		$stateProvider.state('loginRequired.facturas.asignar', {
			url : '/asignar_numero',
			templateUrl : "facturas/index.html",
			controller : 'FacturasIndexController',
		});
		
		$stateProvider.state('loginRequired.facturas.todas', {
			url : '/todas',
			templateUrl : "facturas/todas.html",
			controller : 'FacturasTodasController',
		});
		
		/*Users*/
		$stateProvider.state('loginRequired.users', {
			url : '/usuarios',
			templateUrl : "users/menu.html",
			controller : 'UsersMenuController',
		});
		
		$stateProvider.state('loginRequired.users.editar', {
			url : '/editar',
			templateUrl : "users/todos.html",
			controller : 'UsersTodosController',
		});
		
		$stateProvider.state('loginRequired.users.permisos', {
			url : '/permisos',
			templateUrl : "users/permisos.html",
			controller : 'UsersPermisosController',
		});
		
		$stateProvider.state('loginRequired.users.nuevo', {
			url : '/nuevo',
			templateUrl : "users/nuevo.html",
			controller : 'UsersNewController',
		});
		
		/*Médicos*/
		$stateProvider.state('loginRequired.medicos', {
			url : '/medicos',
			templateUrl : "medicos/menu.html",
			controller : 'MedicosMenuController',
		});
		
		$stateProvider.state('loginRequired.medicos.search', {
			url : '/buscar_medicos',
			templateUrl : "medicos/search.html",
			controller : 'MedicosSearchController',
		});
		
		$stateProvider.state('loginRequired.medicos.info', {
			url : '/:medico_id/informacion',
			templateUrl : "medicos/index.html",
			controller : 'MedicosIndexController',
			params: {medico: null}
		});	

		$stateProvider.state('loginRequired.medicos.nuevo', {
			url : '/nuevo',
			templateUrl : "medicos/index.html",
			controller : 'MedicosNuevoController',
			params: {medico: null}
		});
		
		$stateProvider.state('loginRequired.medicos.instituciones', {
			url : '/instituciones',
			templateUrl : "medicos/instituciones.html",
			controller : 'MedicosInstitucionesController',
			params: {medico: null}
		});	
		
		$stateProvider.state('loginRequired.medicos.especialidades', {
			url : '/especialidades',
			templateUrl : "medicos/especialidades.html",
			controller : 'MedicosEspecialidadesController',
			params: {medico: null}
		});	
		
		/*Estadisticas*/
		$stateProvider.state('loginRequired.estadisticas', {
			url : '/estadisticas',
			templateUrl : "estadisticas/menu.html",
			controller : 'EstadisticasMenuController',
		});
		
		$stateProvider.state('loginRequired.estadisticas.fichas', {
			url : '/fichas',
			templateUrl : "estadisticas/fichas.html",
			controller : 'EstadisticasFichasController',
		});
		
		$stateProvider.state('loginRequired.estadisticas.previsiones', {
			url : '/previsiones',
			templateUrl : "estadisticas/previsiones.html",
			controller : 'EstadisticasPrevisionesController',
		});
		
		$stateProvider.state('loginRequired.estadisticas.medicos', {
			url : '/medicos',
			templateUrl : "estadisticas/medicos.html",
			controller : 'EstadisticasMedicosController',
		});
		
		/*Tipos Parámetros*/
		$stateProvider.state('loginRequired.parametros', {
			url : '/parametros',
			templateUrl : "parametros/menu.html",
			controller : 'ParametrosMenuController',
		});
		
		$stateProvider.state('loginRequired.parametros.color_orina', {
			url : '/:parametro_id/color_orina',
			templateUrl : "parametros/seleccionable.html",
			controller : 'ParametrosColorOrinaController',
		});
		
		/*Otros*/
		$stateProvider.state('loginRequired.otros', {
			url : '/otros',
			templateUrl : "otros/menu.html",
			controller : 'OtrosMenuController',
		});
		
		$stateProvider.state('loginRequired.otros.procesadores', {
			url : '/procesadores',
			templateUrl : "otros/procesadores.html",
			controller : 'OtrosProcesadoresController',
		});
		
		$stateProvider.state('loginRequired.otros.procesos', {
			url : '/procesos',
			templateUrl : "otros/procesos.html",
			controller : 'OtrosProcesosController',
		});
		
		$stateProvider.state('loginRequired.otros.tipos_muestra', {
			url : '/tipos_muestra',
			templateUrl : "otros/tipos_muestra.html",
			controller : 'OtrosTiposMuestrasController',
		});
		
		$stateProvider.state('loginRequired.otros.tipos_examenes', {
			url : '/tipos_examenes',
			templateUrl : "otros/tipos_examenes.html",
			controller : 'OtrosTiposExamenesController',
		});
		
		$stateProvider.state('loginRequired.otros.tipos_envases', {
			url : '/tipos_envases',
			templateUrl : "otros/tipos_envases.html",
			controller : 'OtrosTiposEnvasesController',
		});
		
		$stateProvider.state('loginRequired.otros.tapas_tubos', {
			url : '/tapas_tubos',
			templateUrl : "otros/tapas_tubos.html",
			controller : 'OtrosTapasTubosController',
		});
		
		$stateProvider.state('loginRequired.otros.indicaciones', {
			url : '/indicaciones',
			templateUrl : "otros/indicaciones.html",
			controller : 'OtrosIndicacionesController',
		});
		
		$stateProvider.state('loginRequired.otros.indicaciones_muestras', {
			url : '/indicaciones_muestras',
			templateUrl : "otros/indicaciones_muestras.html",
			controller : 'OtrosIndicacionesMuestrasController',
		});
		
		$stateProvider.state('loginRequired.otros.previsiones', {
			url : '/previsiones',
			templateUrl : "otros/previsiones.html",
			controller : 'OtrosPrevisionesController',
		});
		
		$stateProvider.state('loginRequired.otros.tipos_pagos', {
			url : '/tipos_pagos',
			templateUrl : "otros/tipos_pagos.html",
			controller : 'OtrosTiposPagosController',
		});
		
		$stateProvider.state('loginRequired.otros.especialidades', {
			url : '/especialidades',
			templateUrl : "otros/especialidades.html",
			controller : 'OtrosEspecialidadesController',
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
