angular.module('lab').controller('PacientesMenuController', function($scope, $http, $stateParams, $auth, $state) {

	if($stateParams.paciente_id==null)$state.go('loginRequired.index');
	$scope.state = $state;

	$scope.tabs = [{
		name : 'Información personal',
		state : 'loginRequired.pacientes.info({paciente: paciente})',
		id : 'loginRequired.pacientes.info',
	}, {
		name : 'Fichas',
		state : 'loginRequired.pacientes.fichas({paciente: paciente})',
		id : 'loginRequired.pacientes.fichas',
	}, {
		name : 'Cotizaciones',
		state : 'loginRequired.pacientes.cotizaciones({paciente: paciente})',
		id : 'loginRequired.pacientes.cotizaciones',
	}, {
		name : 'Exámenes',
		state : 'loginRequired.pacientes.examenes({paciente: paciente})',
		id : 'loginRequired.pacientes.examenes',
	}];

	$scope.$on('pacienteFromEdit', function(event, data) {
		$scope.paciente = data;
	});

	//Get paciente object from db
	$http.get('/api/pacientes/' + $stateParams.paciente_id).success(function(data) {

		//Set of received data to parent paciente object.
		$scope.paciente = data;

		//Functions of paciente object
		$scope.paciente.getNombreCompleto = function() {
			return this.nombre + " " + this.apellido_paterno + " " + this.apellido_materno;
		};
		$scope.paciente.getRutCompleto = function() {
			return this.rut + "" + this.rutdv;
		};
		
		$scope.paciente.getEdad = function() {
			if($scope.paciente != null)
			{
				console.log("paciente get edad");
				var nac = new Date(this.fecha_nacimiento);
				var birthday = +new Date(this.fecha_nacimiento);
				var anios = ((Date.now() - birthday) / (31556926000));
				return ~~anios + " Años";
			}
		};
		$scope.paciente.rut_completo = $scope.paciente.getRutCompleto();
		$scope.paciente.nombre_completo = $scope.paciente.getNombreCompleto();
		$scope.paciente.fecha_nacimiento = new Date(data.fecha_nacimiento);
		$scope.paciente.edad = $scope.paciente.getEdad();
		$scope.paciente.prevision = {
			id : data.prevision_id
		};
		$scope.paciente.region_id = data.region_id;
		$scope.paciente.comuna_id = data.comuna_id;
		$scope.$broadcast('pacienteFromMenu', $scope.paciente);
	}).error(function(data) {
		$state.go('loginRequired.index');
	});
});
