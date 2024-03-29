angular.module('lab').controller('PacientesNewController', function($scope, $auth, $state, $http, $resource, $stateParams, regionesService, previsionesService) {

	$scope.paciente = {};
	$scope.paciente_nuevo = true;
	$scope.paciente.desde_barra = $stateParams.desde_barra;
	$scope.paciente.rut_completo = $stateParams.rut_completo;
	
	$scope.paciente.getEdad = function() {
		var birthday = +new Date(this.fecha_nacimiento);
		var anios = ((Date.now() - birthday) / (31556926000));
		return ~~anios + " Años.";
	}; 

	$scope.paciente.clean = function() {
		console.log('clean paciente');
		$scope.paciente = {
			rut_completo : $stateParams.rut_completo
		};
	}

	$scope.saveNewPaciente = function(value) {
		if($scope.paciente_form.$valid)
		{
			$scope.paciente.rut = $scope.paciente.rut_completo.substring(0,$scope.paciente.rut_completo.length-1);
			$scope.paciente.rutdv = $scope.paciente.rut_completo.substring($scope.paciente.rut_completo.length-1,$scope.paciente.rut_completo.length);
			$scope.paciente.prevision_id = $scope.paciente.prevision.id;
			$scope.paciente.prevision = null;
			$scope.paciente.comuna_id = $scope.paciente.comuna.id;
			$scope.paciente.region = null;
			$scope.paciente.comuna = null;
			$scope.paciente.user_id = $auth.user.id;
	
			var Paciente = $resource('/api/pacientes', $scope.paciente);
			var paciente = new Paciente();
			paciente.$save().then(function(results) {
				$state.go('loginRequired.pacientes.info',{paciente_id: results.data.id});
			});
		}
		else
		{
			console.log($scope.paciente_form.correo.$error);
		}
	};

	$scope.setRegiones = function(regiones)
	{
		$scope.regiones = regionesService.getRegiones();
		angular.forEach($scope.regiones, function(r, key) {
			if (r.id == 5) {
				$scope.paciente.region = r;
				angular.forEach(r.comunas, function(c, key) {
					if (c.id == 42) {
						$scope.paciente.comuna = c;
					}
				});
			}
		});
	}

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

	if(!previsionesService.getPrevisiones())
	{
		$http.get('/api/previsiones').success(function(data) {
			$scope.plans = previsionesService.getPrevisiones();
		}).error(function(data) {
			console.log('Error getting previsiones');
		});
	}
	else
	{
		$scope.plans = previsionesService.getPrevisiones();
	}
});
