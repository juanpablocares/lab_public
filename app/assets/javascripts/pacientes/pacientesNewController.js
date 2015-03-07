angular.module('lab').controller('PacientesNewController', function($scope, $auth, $state, $http, $resource, $stateParams, Pacientes) {

	$scope.paciente = {};
	$scope.paciente.rut_completo = $stateParams.rut_completo;
	
	$scope.paciente.getEdad = function() {
		console.log("getEdad");
		var birthday = +new Date(this.fecha_nacimiento);
		var anios = ((Date.now() - birthday) / (31556926000));
		return ~~anios + " Años.";
	};
	
	$scope.paciente.clean = function() {
		$scope.paciente = {
			rut_completo: $stateParams.rut_completo
		};
	}

	$scope.saveNewPaciente = function(value) {
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
		paciente.$save();
		
		//ir a pagina del paciente creado
		
	};
	
	$http.get('/api/regiones').success(function(data) {
		$scope.regiones = data;
	}).error(function(data) {});

	$http.get('/api/previsiones').success(function(data) {
		$scope.plans = data;
	}).error(function(data) {});
});
