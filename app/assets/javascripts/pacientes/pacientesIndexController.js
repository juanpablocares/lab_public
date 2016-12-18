angular.module('lab').controller('PacientesIndexController', function($scope, $auth, $state, $http, $stateParams, Pacientes, Previsiones,  previsionesService, regionesService) {

	$scope.masterPaciente = {};
	$scope.paciente = {};

	$scope.generos_options = [{'id':1, 'text':'Masculino'},
	                          {'id':0, 'text':'Femenino'}];
	
	$scope.setRegiones = function()
	{
		$scope.regiones = regionesService.getRegiones();
		angular.forEach($scope.regiones, function(region, key) {
			if (region.id == $scope.paciente.comuna.region.id) {
				$scope.paciente.region = region;
				$scope.masterPaciente = angular.copy($scope.paciente);
			}
		});
	}

	$scope.$on('pacienteFromMenu', function(event, data) {
		if(data.comuna)
		{
			if (data.fecha_nacimiento != undefined) {
				data.fecha_nacimiento = new Date(data.fecha_nacimiento.getUTCFullYear(), data.fecha_nacimiento.getUTCMonth(), data.fecha_nacimiento.getUTCDate());
			}
			
			if (data.creado != undefined) {
				data.creado = new Date(data.creado);
			}
			
			$scope.paciente = data;
			$scope.masterPaciente = angular.copy($scope.paciente);
			console.log($scope.masterPaciente);

			if(!regionesService.getRegiones())
			{
				$http.get('/api/regiones').success(function(data) {
					regionesService.setRegiones(data);
					$scope.setRegiones();
				}).error(function(data) {
					console.log('Error getting regiones');
				});
			}
			else {
				$scope.setRegiones();
			}
		}
	});

	$scope.$emit('PedirPacienteFromMenu');

	if(!previsionesService.getPrevisiones())
	{
		Previsiones.all.get().$promise.then(function(data) {
			previsionesService.setPrevisiones(data.previsiones);
			$scope.plans = previsionesService.getPrevisiones();
		}, function(data) {
			console.log('Error getting previsiones');
		});
	}
	else
	{
		$scope.plans = previsionesService.getPrevisiones();
	}

	$scope.pacienteEditing = true;

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

	
	$scope.volver = function(){
		window.history.back();
	};
	
	$scope.guardarDatosPersonales = function(paciente) {
		if($scope.paciente_form.$valid)
		{
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
					$scope.$emit('showGlobalAlert', {boldMessage: 'Editar Paciente', message: 'Cambios a paciente guardados exitosamente.',class: 'alert-success'});
				}, function(response) {
					$scope.resetPaciente();
					console.log("ERROR editando paciente");
				});
			});
		}
	};
});
