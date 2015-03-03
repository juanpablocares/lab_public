angular.module('lab').controller('RecepcionController', ['$scope','$auth','$resource', '$http', 'Pacientes',
function($scope, $auth, $resource, $http, Pacientes) {
	$scope.tipo = 0;
	$scope.paciente = {};
	
	$scope.clean = function() {
		$scope.paciente = {};
	}

	$scope.searchByRut = function(value) {
		$scope.paciente.rut_completo = value;
		$scope.searchForm.$setPristine();

		Pacientes.show({
			rut : parseInt((value) / 10)
		}, function(datos) {
			if (datos.rut == null) {
				$scope.tipo = 1;
			}
			else {
				$scope.tipo = 2;
				$scope.paciente = datos
			}
		});
	}

	$scope.storeData = function(value) {

		var Paciente = $resource('/api/pacientes', $scope.paciente);
		var paciente = new Paciente();
		paciente.rut = parseInt(($scope.paciente.rut_completo) / 10);
		paciente.rutdv = parseInt(($scope.paciente.rut_completo) % 10);
		paciente.prevision_id = $scope.paciente.prevision.id;
		paciente.comuna_id = $scope.paciente.comuna.id;
		paciente.user_id = $auth.user.id;
		paciente.$save();
	}

	$scope.calculateAge = function calculateAge(birthday) {// birthday is a date
		var dateBirthday = new Date(birthday);
		var ageDifMs = Date.now() - dateBirthday.getTime();
		var ageDate = new Date(ageDifMs);
		// miliseconds from epoch
		$scope.edad = Math.abs(ageDate.getUTCFullYear() - 1970);
		return Math.abs(ageDate.getUTCFullYear() - 1970);
	}

	$http.get('/api/previsiones').success(function(data) {
		$scope.plans = data;
	}).error(function(data) {
		// log error
	});

	$http.get('/api/regiones').success(function(data) {
		$scope.regiones = data;
	}).error(function(data) {
		// log error
	});

	$http.get('/api/comunas').success(function(data) {
		$scope.comunas = data;
	}).error(function(data) {
		// log error
	});
}]); 