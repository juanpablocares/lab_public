angular.module('lab').controller('RecepcionController', ['$scope','$auth','$resource', '$http', 'Pacientes',
function($scope, $auth, $resource, $http, Pacientes) {
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
				$scope.tipo = 1;
			}
			else {
				$scope.tipo = 2;
				//Tiene que ser "a mano" la entrega de datos por problemas con la fecha, sino no es recibida en angular
				$scope.paciente.rut = datos.rut;
				$scope.paciente.rutdv = datos.rutdv;
				$scope.paciente.nombre = datos.nombre;
				$scope.paciente.apellido_paterno = datos.apellido_paterno;
				$scope.paciente.apellido_materno = datos.apellido_materno;
				$scope.paciente.celular = datos.celular;
				$scope.paciente.direccion = datos.direccion;
				$scope.paciente.fecha_nacimiento = new Date(datos.fecha_nacimiento);
				//Tiene problemas con el retorno de la fecha, siempre retorna un día menos, por eso lo agrego
				$scope.paciente.fecha_nacimiento.setDate($scope.paciente.fecha_nacimiento.getDate() + 1);
				//Calculo de la edad
				var ageDifMs = Date.now() - $scope.paciente.fecha_nacimiento.getTime();
				var ageDate = new Date(ageDifMs);
				// miliseconds from epoch
				$scope.edad = Math.abs(ageDate.getUTCFullYear() - 1970);
				$scope.paciente.genero = datos.genero;
				$scope.paciente.diagnostico = datos.diagnostico;
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