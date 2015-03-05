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
		$stateParams.paciente = data;
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
});
