angular.module('lab').controller('PacientesMenuController', function($scope, $http, $stateParams, $auth, $state) {
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

	//Get paciente object from db
	$http.get('/api/pacientes/' + $stateParams.paciente_id).success(function(data) {

		//Set of received data to parent paciente object.
		$stateParams.paciente = data;

		//Functions of paciente object
		$stateParams.paciente.getNombreCompleto = function() {
			return this.nombre + " " + this.apellido_paterno + " " + this.apellido_materno;
		};
		$stateParams.paciente.getRutCompleto = function() {
			return this.rut + "" + this.rutdv;
		};
		$stateParams.paciente.getEdad = function() {
			console.log(this.fecha_nacimiento);
			var nac = new Date(this.fecha_nacimiento);
			
			console.log(nac);
			
			
			var birthday = +new Date(this.fecha_nacimiento);
			var anios = ((Date.now() - birthday) / (31556926000));
			return ~~anios + " Años.";
		};

		//Set data that needs specific format
		$stateParams.paciente.rut_completo = $stateParams.paciente.getRutCompleto();
		$stateParams.paciente.nombre_completo = $stateParams.paciente.getNombreCompleto();
		$stateParams.paciente.fecha_nacimiento = new Date(data.fecha_nacimiento);
		$stateParams.paciente.edad = $stateParams.paciente.getEdad();
		$stateParams.paciente.prevision = {
			id : data.prevision_id
		};
		//test
		//$stateParams.paciente.region = {id: data.region_id};		//OK pero no actualiza la tabla de comunas
		$stateParams.paciente.region_id = data.region_id;
		//$stateParams.paciente.comuna = {id: data.comuna_id};
		$stateParams.paciente.comuna_id = data.comuna_id;

		//made $stateParams.paciente accesible from the view
		$scope.paciente = $stateParams.paciente;
		//Enviar aviso de que existe el objeto y entregar el objeto paciente.
		$scope.$broadcast('pacienteJSON',$scope.paciente);
		
	}).error(function(data) {
		$state.go('loginRequired.index');
	});
});
