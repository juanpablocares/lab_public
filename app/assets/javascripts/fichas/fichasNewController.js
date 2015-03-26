/**
 * Controlador encargado de la creación de fichas clinicas y cotizaciones.
 */

/*
 Ejemplo de formato de Model "listado"

 Cada vez que en la vista se agreguen examenes, se agregarán de ésta forma al model "listado"
 y luego listado es lo que se enviará a la api, ademas de los datos del paciente

 */

angular.module('lab').controller('FichasNewController', function($scope, $auth, $state, $http, $resource, $stateParams, Examenes, Perfiles, Cotizaciones, Procedencias, Fichas) {

	$scope.selectModel = {};
	$scope.procedencia = {};
	$scope.examenes = {};
	$scope.perfiles = {}; 
	$scope.procedenciasArray = [];
	$scope.examenesArray = [];
	$scope.examenesSeleccionados = [];
	$scope.editExamenes = true;

	Procedencias.buscar.todos().$promise.then(function(response) {
		$scope.procedenciasArray = response.data;
	}, function(response) {
		console.log("ERROR obteniendo procedencias");
	}); 

	Examenes.buscar.todos().$promise.then(function(response) {
		$scope.examenes = response.data;
		$scope.crearExamenesArray();
	}, function(response) {
		console.log("ERROR obteniendo examenes");
	});

	Perfiles.buscar.todos().$promise.then(function(response) {
		$scope.perfiles = response.data;
		$scope.crearExamenesArray();
	}, function(response) {
		console.log("ERROR obteniendo perfiles");
	});

	$scope.crearExamenesArray = function() {
		$scope.examenesArray = [];
		angular.forEach($scope.perfiles, function(value, key) {
			value.perfil = true;
			$scope.examenesArray.push(value);
		});
		angular.forEach($scope.examenes, function(value, key) {
			value.perfil = false;
			$scope.examenesArray.push(value);
		});
	};

	$scope.quitarExamenSeleccionado = function(item) {
		var index = $scope.examenesSeleccionados.indexOf(item);
		$scope.examenesSeleccionados.splice(index, 1);
	};

	$scope.agruparPerfiles = function(item) {
		if (item.perfil)
			return 'Perfiles';
		else
			return 'Exámenes';
	};

	$scope.seleccionarExamen = function(model, select) {
		$scope.examenesSeleccionados.push(model);
		select.selected = "";
	};

	$scope.crearCotizacion = function() {
		data = {
			paciente_id : $stateParams.paciente_id,
			procedencia_id: $scope.procedencia.selected.id,
			examenes : $scope.examenesSeleccionados,
		};
		Cotizaciones.root.new(data).$promise.then(function(response) {
			$state.go('loginRequired.pacientes',{paciente_id: $stateParams.paciente_id}); 
		}, function(response) { 
			console.log("ERROR creando cotización");
		});

	};
	
	$scope.crearFicha = function() {
		data = {
			paciente_id : $stateParams.paciente_id,
			procedencia_id: $scope.procedencia.selected.id,
			examenes : $scope.examenesSeleccionados,
		};
		Fichas.root.new(data).$promise.then(function(response) {
			//$state.go('loginRequired.pacientes',{paciente_id: $stateParams.paciente_id}); 
			$state.go('LoginRequired.pacientes.ficha',{paciente_id: $stateParams.paciente_id});
		}, function(response) {
			console.log("ERROR creando ficha");
		});

	};
});

