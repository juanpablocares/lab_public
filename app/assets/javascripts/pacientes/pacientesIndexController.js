angular.module('lab').controller('PacientesIndexController', function($scope, $auth, $state, $http, $stateParams, Pacientes) {

	$scope.$on('pacienteFromMenu', function(event, data) {
		data.fecha_nacimiento = new Date(data.fecha_nacimiento.getUTCFullYear(), data.fecha_nacimiento.getUTCMonth(),data.fecha_nacimiento.getUTCDate());
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
	});

	$http.get('/api/previsiones').success(function(data) {
		console.log("Cargar previsiones");
		$scope.plans = data;
	}).error(function(data) {
		// log error
	});

	if ($stateParams.paciente != null) {
		console.log("Paciente desde $stateParams");
		$scope.paciente = $stateParams.paciente;
		$scope.masterPaciente = angular.copy($scope.paciente);
		$http.get('/api/regiones').success(function(data) {
			console.log("Cargar Regiones");
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
	}

	$scope.pacienteEditing = false;

	$scope.updatePaciente = function() {
		$scope.paciente.rut_completo = $scope.paciente.getRutCompleto();
		$scope.paciente.nombre_completo = $scope.paciente.getNombreCompleto();
		$scope.paciente.fecha_nacimiento = new Date($scope.paciente.fecha_nacimiento);
		$scope.paciente.edad = $scope.paciente.getEdad(); 
		$scope.masterPaciente = angular.copy($scope.paciente);
		$scope.$emit('pacienteFromEdit',$scope.paciente);
	};

	$scope.resetPaciente = function() {
		$scope.pacienteEditingForm.$setPristine();
		$scope.paciente = angular.copy($scope.masterPaciente);
	};

	$scope.cambiarVentanaSinCambios = function() {
		$scope.pacienteEditing = !$scope.pacienteEditing;
		$scope.resetPaciente();
	};

	$scope.guardarDatosPersonales = function(paciente) {
		console.log("Guardar cambios en paciente");
		paciente.prevision_id = paciente.prevision.id;
		paciente.comuna_id = paciente.comuna.id;
		Pacientes.by_rut.show({
			rut : paciente.rut
		}, function(datos) {
			Pacientes.by_rut.update({
				rut : datos.rut
			}, paciente).
			$promise.
			then(function(response) {
				$scope.updatePaciente();
				$scope.pacienteEditing = !$scope.pacienteEditing;
			}, function(response) {
				$scope.resetPaciente();
				console.log("ERROR editando paciente");
			});
		});
	};
});
