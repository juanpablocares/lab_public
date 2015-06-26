angular.module('lab').controller('OtrosMenuController', function($scope, $http, $stateParams, $auth, $state) {

	$scope.state = $state;

	$scope.tabs = [{
		name : 'Proceso',
		state : 'loginRequired.otros.procesos({})',
		id : 'loginRequired.otros.procesos',
	},{
		name : 'Procesador',
		state : 'loginRequired.otros.procesadores({})',
		id : 'loginRequired.otros.procesadores',
	},{
		name : 'Tipos Muestra',
		state : 'loginRequired.otros.tipos_muestra({})',
		id : 'loginRequired.otros.tipos_muestra',
	},{
		name : 'Tipos Examen',
		state : 'loginRequired.otros.tipos_examenes({})',
		id : 'loginRequired.otros.tipos_examenes',
	},{
		name : 'Tipos Envases',
		state : 'loginRequired.otros.tipos_envases({})',
		id : 'loginRequired.otros.tipos_envases',
	},{
		name : 'Tapas Tubos',
		state : 'loginRequired.otros.tapas_tubos({})',
		id : 'loginRequired.otros.tapas_tubos',
	},{
		name : 'Indicaciones',
		state : 'loginRequired.otros.indicaciones({})',
		id : 'loginRequired.otros.indicaciones',
	},{
		name : 'Indicaciones Muestras',
		state : 'loginRequired.otros.indicaciones_muestras({})',
		id : 'loginRequired.otros.indicaciones_muestras',
	},{
		name : 'Previsiones',
		state : 'loginRequired.otros.previsiones({})',
		id : 'loginRequired.otros.previsiones',
	},{
		name : 'Tipos Pagos',
		state : 'loginRequired.otros.tipos_pagos({})',
		id : 'loginRequired.otros.tipos_pagos',
	},{
		name : 'Especialidades',
		state : 'loginRequired.otros.especialidades({})',
		id : 'loginRequired.otros.especialidades',
	},];
});