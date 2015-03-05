angular.module('lab').controller('RecepcionController', ['$scope','$auth','$resource', '$http', 'Pacientes','$state',
function($scope, $auth, $resource, $http, Pacientes, $state) {
	$scope.tipo = 0;
	$scope.paciente = {};
	
	$scope.calculateAge = function calculateAge(birthday) {// birthday is a date
		var dateBirthday = new Date(birthday);
		var ageDifMs = Date.now() - dateBirthday.getTime();
		var ageDate = new Date(ageDifMs);
		// miliseconds from epoch
		$scope.edad = Math.abs(ageDate.getUTCFullYear() - 1970);
		return Math.abs(ageDate.getUTCFullYear() - 1970);
	}
	
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
				//borrar esto en recepcion.html
				$scope.tipo = 1;
			}
			else {
				paciente = datos.toJSON();
				$state.go('loginRequired.pacientes.info',{ paciente_id: paciente.id, paciente: paciente});
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

	$scope.updateData = function() {
		Pacientes.show({
			rut : parseInt(($scope.paciente.rut_completo) / 10)
		}, function(datos) {
			datos.diagnostico = $scope.paciente.diagnostico;
			console.log($scope.paciente.diagnostico);
			Pacientes.update_byrut({rut:datos.rut}, datos);
		});
	}
	
	$http.get('/api/previsiones').success(function(data) {
		$scope.plans = data;
	}).error(function(data) {
		// log error
	});

	$http.get('/api/regiones').success(function(data) {
		$scope.regiones = data;
		//Seteo de valores por defecto de región y comuna
		$scope.paciente.region = data[4];
		$scope.paciente.comuna = data[4].comunas[1];
	}).error(function(data) {
		// log error
	});
}]); 