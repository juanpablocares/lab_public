angular.module('lab').controller('PacientesMenuController', function($scope, $http, $stateParams, $auth, $state) {

	if($stateParams.paciente_id==null)$state.go('loginRequired.index');
	$scope.state = $state;

	$scope.tabs = [{
		name : 'Información personal',
		state : 'loginRequired.pacientes.info()',
		id : 'loginRequired.pacientes.info',
	}, {
		name : 'Fichas',
		state : 'loginRequired.pacientes.fichas()',
		id : 'loginRequired.pacientes.fichas',
	}, {
		name : 'Cotizaciones',
		state : 'loginRequired.pacientes.cotizaciones()',
		id : 'loginRequired.pacientes.cotizaciones',
	}, {
		name : 'Exámenes',
		state : 'loginRequired.pacientes.examenes()',
		id : 'loginRequired.pacientes.examenes',
	}];

	$scope.$on('pacienteFromEdit', function(event, data) {
		$scope.paciente = data;
	});

	//Get paciente object from db
	$http.get('/api/pacientes/' + $stateParams.paciente_id).success(function(data) {
		//Set of received data to parent paciente object.
		$scope.paciente = data.data;
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
				this.fecha_nacimiento = new Date(this.fecha_nacimiento.getUTCFullYear(), this.fecha_nacimiento.getUTCMonth(),this.fecha_nacimiento.getUTCDate());
				
				var d = new Date();
				var meses = 0;
				if(this.fecha_nacimiento.getUTCMonth() - d.getMonth() > 0)
					meses += 12 - this.fecha_nacimiento.getUTCMonth() + d.getMonth();
				else
					meses = Math.abs(this.fecha_nacimiento.getUTCMonth() - d.getMonth());
				var nac = new Date(this.fecha_nacimiento);
				var birthday = +new Date(this.fecha_nacimiento);
				var anios = ((Date.now() - birthday) / (31556926000));
				return ~~anios + " Años " + ~~meses + " meses";
			}
		};
		
		$scope.paciente.rut_completo = $scope.paciente.getRutCompleto();
		$scope.paciente.nombre_completo = $scope.paciente.getNombreCompleto();
		$scope.paciente.fecha_nacimiento = new Date($scope.paciente.fecha_nacimiento);
		$scope.paciente.edad = $scope.paciente.getEdad();
		$scope.paciente.comuna_id = $scope.paciente.comuna.id;
		$scope.paciente.region_id = $scope.paciente.comuna.region.id;
		$scope.mandarPaciente();
	}).error(function(data) {
		$scope.$emit('showGlobalAlert', {boldMessage: 'Información Paciente', message: 'Paciente no encontrado.',class: 'alert-danger'});
		$state.go('loginRequired.buscar_paciente');
	});
	
	$scope.$on('PedirPacienteFromMenu', function(event, data) {
		$scope.mandarPaciente();
	});

	$scope.mandarPaciente = function()
	{
		$scope.$broadcast('pacienteFromMenu', $scope.paciente);
	}
});