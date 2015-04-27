angular.module('lab').controller('PacientesNewController', function($scope, $auth, $state, $http, $resource, $stateParams) {

	$scope.paciente = {};
	$scope.paciente.desde_barra = $stateParams.desde_barra;
	$scope.paciente.rut_completo = $stateParams.rut_completo;

	$scope.paciente.getEdad = function() {
		var birthday = +new Date(this.fecha_nacimiento);
		var anios = ((Date.now() - birthday) / (31556926000));
		return ~~anios + " Años.";
	}; 

	$scope.paciente.clean = function() {
		$scope.paciente = {
			rut_completo : $stateParams.rut_completo
		};
	}

	$scope.saveNewPaciente = function(value) {
		if($scope.paciente_form.$valid)
		{
			$scope.paciente.rut = parseInt(($scope.paciente.rut_completo) / 10);
			$scope.paciente.rutdv = parseInt(($scope.paciente.rut_completo) % 10);
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
	};

	$http.get('/api/regiones').success(function(data) {
		$scope.regiones = data;
	}).error(function(data) {
	});

	$http.get('/api/previsiones').success(function(data) {
		$scope.plans = data;
	}).error(function(data) {
	});
});
