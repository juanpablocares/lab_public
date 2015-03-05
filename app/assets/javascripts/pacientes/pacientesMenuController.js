angular.module('lab').controller('PacientesMenuController', function($scope, $http,  $stateParams, $auth, $state) {
	$scope.state = $state;
	
	$scope.tabs = [{
		name : 'Información personal',
		id : 'loginRequired.pacientes.info'
	}, {
		name : 'Fichas',
		id : 'loginRequired.pacientes.fichas'
	}, {
		name : 'Cotizaciones',
		id : 'loginRequired.pacientes.cotizaciones'
	}, {
		name : 'Exámenes',
		id : 'loginRequired.pacientes.examenes'
	}];
	
	$http.get('/api/pacientes/' + $stateParams.paciente_id).success(function(data) {
		//$stateParams.paciente = data;
		
		//Tiene que ser "a mano" la entrega de datos por problemas con la fecha, sino no es recibida en angular
		$stateParams.paciente.rut_completo = data.rut+""+data.rutdv;
		$stateParams.paciente.rut = data.rut;
		$stateParams.paciente.rutdv = data.rutdv;
		$stateParams.paciente.nombre = data.nombre;
		$stateParams.paciente.apellido_paterno = data.apellido_paterno;
		$stateParams.paciente.apellido_materno = data.apellido_materno;
		$stateParams.paciente.celular = data.celular;
		$stateParams.paciente.direccion = data.direccion;
		$stateParams.paciente.fecha_nacimiento = new Date(data.fecha_nacimiento);
		//Tiene problemas con el retorno de la fecha, siempre retorna un día menos, por eso lo agrego
		$stateParams.paciente.fecha_nacimiento.setDate($stateParams.paciente.fecha_nacimiento.getDate() + 1);
		//Calculo de la edad
		var ageDifMs = Date.now() - $stateParams.paciente.fecha_nacimiento.getTime();
		var ageDate = new Date(ageDifMs);
		// miliseconds from epoch
		$stateParams.paciente.edad = Math.abs(ageDate.getUTCFullYear() - 1970);
		$stateParams.paciente.genero = data.genero;
		$stateParams.paciente.diagnostico = data.diagnostico;
		$stateParams.paciente.prevision_id = data.prevision_id;
		//$scope.paciente.region = 5;
		//Fin paso de datos
		
		$stateParams.paciente.getNombreCompleto = function(){
			return $stateParams.paciente.nombre+" "+$stateParams.paciente.apellido_paterno+" "+$stateParams.paciente.apellido_materno;
		};
		$stateParams.paciente.getRutCompleto = function(){
			return $stateParams.paciente.rut+"-"+$stateParams.paciente.rutdv;
		}; 
		$scope.paciente = $stateParams.paciente;
	}).error(function(data) {
		$state.go('loginRequired.index');
	});
	
	$http.get('/api/regiones').success(function(data) {
 		$scope.regiones = data;
	}).error(function(data) {
		// log error
	});
	
	$http.get('/api/previsiones').success(function(data) {
		$scope.plans = data;
		for	(index = 0; index < data.length; index++){
			if(data[index].id == $stateParams.paciente.prevision_id)
				$stateParams.paciente.prevision = data[index];
		}
	}).error(function(data) {
		// log error
	});
});
