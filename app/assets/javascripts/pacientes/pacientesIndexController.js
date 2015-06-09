angular.module('lab').controller('PacientesIndexController', function($scope, $auth, $state, $http, $stateParams, Pacientes) {

	$scope.masterPaciente = {};

	$scope.$on('pacienteFromMenu', function(event, data) {
		
		if (data.fecha_nacimiento != undefined) {
			data.fecha_nacimiento = new Date(data.fecha_nacimiento.getUTCFullYear(), data.fecha_nacimiento.getUTCMonth(), data.fecha_nacimiento.getUTCDate());
		}
		
		if (data.creado != undefined) {
			data.creado = new Date(data.creado);
		}
		
		$scope.paciente = data;
		$scope.masterPaciente = angular.copy($scope.paciente);
		$http.get('/api/regiones').success(function(data) {
			$scope.regiones = data;
			angular.forEach(data, function(region, key) {
				if (region.id == $scope.paciente.comuna.region.id) {
					$scope.paciente.region = region;
					$scope.masterPaciente = angular.copy($scope.paciente);
				}
			});
		}).error(function(data) {
			// log error
		});
	});
	$scope.$emit('PedirPacienteFromMenu');

	$http.get('/api/previsiones').success(function(data) {
		$scope.plans = data.previsiones;
	}).error(function(data) {
		// log error
	});

	$scope.pacienteEditing = false;

	$scope.crear_ficha_temporal = function() {

		$scope.ficha = new Object();
		$scope.ficha.paciente = $scope.paciente;
		
		$state.go('loginRequired.ficha_temporal', {
				paciente_id : $stateParams.paciente_id,
				ficha: $scope.ficha
			});
	};
	
	$scope.updatePaciente = function() {
		$scope.paciente.rut_completo = $scope.paciente.getRutCompleto();
		$scope.paciente.nombre_completo = $scope.paciente.getNombreCompleto();
		$scope.paciente.fecha_nacimiento = new Date($scope.paciente.fecha_nacimiento);
		$scope.paciente.edad = $scope.paciente.getEdad();
		$scope.masterPaciente = angular.copy($scope.paciente);
		$scope.$emit('pacienteFromEdit', $scope.paciente);
	};

	$scope.resetPaciente = function() {
		$scope.paciente_form.$setPristine();
		$scope.paciente = angular.copy($scope.masterPaciente);
	};

	$scope.cambiarVentanaSinCambios = function() {
		$scope.pacienteEditing = !$scope.pacienteEditing;
		$scope.resetPaciente();
	};

	$scope.guardarDatosPersonales = function(paciente) {
		if($scope.paciente_form.$valid)
		{
			console.log("Guardar cambios en paciente");
			paciente.prevision_id = paciente.prevision.id;
			paciente.comuna_id = paciente.comuna.id;
			Pacientes.by_rut.show({
				rut : paciente.rut
			}, function(datos) {
				Pacientes.by_rut.update({
					rut : datos.rut
				}, paciente).$promise.then(function(response) {
					$scope.updatePaciente();
					$scope.pacienteEditing = !$scope.pacienteEditing;
				}, function(response) {
					$scope.resetPaciente();
					console.log("ERROR editando paciente");
				});
			});
		}
	};
});
