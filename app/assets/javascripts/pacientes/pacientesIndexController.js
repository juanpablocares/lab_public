angular.module('lab').controller('PacientesIndexController', function($scope, $auth, $state, $http, $stateParams, Pacientes) {

	$scope.$on('pacienteJSON', function(event, data) {
		$scope.paciente = data;
		$scope.masterPaciente = angular.copy($scope.paciente);
		$http.get('/api/regiones').success(function(data) {
			$scope.regiones = data;
			angular.forEach(data, function(region, key) {
				if (region.id == $scope.paciente.region_id) {
					$scope.paciente.region = region;
					$scope.paciente.comuna = {
						id : $scope.paciente.comuna_id
					};
					$scope.masterPaciente = angular.copy($scope.paciente);
				}
			});
		}).error(function(data) {
			// log error
		});

		$http.get('/api/previsiones').success(function(data) {
			$scope.plans = data;
		}).error(function(data) {
			// log error
		});
	});

	$scope.pacienteEditing = false;

	$scope.updatePaciente = function() {
		$scope.masterPaciente = angular.copy($scope.paciente);
	};

	$scope.resetPaciente = function() {
		$scope.paciente = angular.copy($scope.masterPaciente);
	};

	$scope.cambiarVentanaSinCambios = function() {
		$scope.pacienteEditing = !$scope.pacienteEditing;
		$scope.resetPaciente();
	};

	$scope.guardarDatosPersonales = function(paciente) {
		
		paciente.prevision_id = paciente.prevision.id;
		paciente.comuna_id = paciente.comuna.id;
		
		Pacientes.by_rut.show({
			rut : paciente.rut
		}, function(datos) {
			Pacientes.by_rut.update({
				rut : datos.rut
			}, paciente).success(function(response) {
				console.log(response);
				$scope.updatePaciente();
				$scope.pacienteEditing = !$scope.pacienteEditing;
			}).errors(function(response) {
				$scope.resetPaciente();
				console.log("ERROR editando paciente");
				console.log(response);
			});
		});
	};
});
