/**
 * Controlador encargado de la creación de fichas clinicas y cotizaciones.
 */

/*
 Ejemplo de formato de Model "listado"

 Cada vez que en la vista se agreguen examenes, se agregarán de ésta forma al model "listado"
 y luego listado es lo que se enviará a la api, ademas de los datos del paciente

 */

angular.module('lab').controller('FichasNewController', function($scope, $auth, $state, $http, $resource, $stateParams, Examenes, Perfiles, Cotizaciones, Procedencias, Fichas) {

	$scope.ficha = {};
	$scope.selectModel = {};
	$scope.procedencia = {};
	$scope.observaciones = "";
	$scope.examenes = {};
	$scope.perfiles = {};
	$scope.paciente = {};
	$scope.precio_total = 0;
	$scope.procedenciasArray = [];
	$scope.examenesArray = [];
	$scope.examenesSeleccionados = [];
	$scope.editExamenes = true;

	$scope.$on('pacienteFromMenu', function(event, data) {
		if (data.id != null) {
			$scope.paciente = data;

			Procedencias.buscar.todos().$promise.then(function(response) {
				$scope.procedenciasArray = response.data;
			}, function(response) {
				console.log("ERROR obteniendo procedencias");
			});

			Examenes.all.index({
			}).$promise.then(function(response) {
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
		}
	});

	$scope.$emit('PedirPacienteFromMenu');

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
		$scope.getPrecioTotal();
	};

	$scope.agruparPerfiles = function(item) {
		if (item.perfil)
			return 'Perfiles';
		else
			return 'Exámenes';
	};

	$scope.seleccionarExamen = function(model, select) {

		if (!model.perfil) {
			var temp = null;
			for (var i = 0; i < model.tarifas_examen.length; i++) {
				value = model.tarifas_examen[i];
				if (value.tarifa_id == $scope.paciente.prevision.tarifa_id) {
					temp = value;
				}
			}
			model.tarifas_examen = [temp];
		}
		else {
			for (var i = 0; i < model.examenes.length; i++) {
				value = model.examenes[i];
				var temp = null;
				for (var j = 0; j < value.tarifas_examen.length; j++) {
					value2 = value.tarifas_examen[j];
					if (value2.tarifa_id == $scope.paciente.prevision.tarifa_id) {
						temp = value2;
					}
				}
				value.tarifas_examen = [temp];
			}
		}
		$scope.examenesSeleccionados.push(model);
		select.selected = "";
		console.log($scope.examenesSeleccionados);
		$scope.getPrecioTotal();
	};

	$scope.crearCotizacion = function() {
		data = {
			paciente_id : $stateParams.paciente_id,
			procedencia_id : $scope.procedencia.selected.id,
			examenes : $scope.examenesSeleccionados,
		};
		Cotizaciones.root.new(data).$promise.then(function(response) {
			$state.go('loginRequired.pacientes', {
				paciente_id : $stateParams.paciente_id
			});
		}, function(response) {
			console.log("ERROR creando cotización");
		});
	};

	$scope.crearFicha = function() {
		data = {
			paciente_id : $stateParams.paciente_id,
			procedencia_id : $scope.procedencia.selected.id,
			observaciones : $scope.observaciones,
			precio_total : $scope.precio_total,
			examenes : $scope.examenesSeleccionados,
		};
		Fichas.root.new(data).$promise.then(function(response) {
			$state.go('loginRequired.fichas.info', {
				ficha_id : response.data.id
			});
		}, function(response) {
			console.log("ERROR creando ficha");
		});

	};

	$scope.getPrecioTotal = function() {
		var total = 0;
		for (var i = 0; i < $scope.examenesSeleccionados.length; i++) {
			if ($scope.examenesSeleccionados[i].perfil) {
				for (var j = 0; j < $scope.examenesSeleccionados[i].examenes.length; j++) {
					if($scope.examenesSeleccionados[i].examenes[j].tarifas_examen[0])
					{
						total = total + $scope.examenesSeleccionados[i].examenes[j].tarifas_examen[0].precio;
					}
				}
			}
			else {
				if($scope.examenesSeleccionados[i].tarifas_examen[0])
				{
					total = total + $scope.examenesSeleccionados[i].tarifas_examen[0].precio;
				}
			}
		}
		$scope.precio_total = total;
	}
});

